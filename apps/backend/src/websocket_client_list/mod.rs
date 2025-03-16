use axum::extract::ws::{Message, WebSocket};
use futures::SinkExt;
use futures::stream::SplitSink;
use std::sync::Arc;
use tokio::sync::Mutex;

pub type Client = SplitSink<WebSocket, Message>;

#[derive(Debug, Clone)]
pub struct WebSocketClientList {
    clients: Arc<Mutex<Vec<Client>>>,
}

impl WebSocketClientList {
    pub fn new() -> Self {
        Self {
            clients: Arc::new(Mutex::new(Vec::new())),
        }
    }

    pub async fn add_client(&self, client: Client) {
        let mut clients = self.clients.lock().await;
        clients.push(client);
    }

    pub async fn broadcast(&self, message: &str) {
        let mut clients = self.clients.lock().await;

        let mut failed_indices = Vec::new();

        for (index, client) in clients.iter_mut().enumerate() {
            println!("client: {:?}", client);
            if client.send(Message::Text(message.into())).await.is_err() {
                failed_indices.push(index);
            }
        }

        for &index in failed_indices.iter().rev() {
            let _ = clients.swap_remove(index);
        }
    }
}
