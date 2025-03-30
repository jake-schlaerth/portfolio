use axum::extract::ws::{Message, WebSocket};
use futures::SinkExt;
use futures::stream::SplitSink;
use std::collections::HashMap;
use tokio::sync::Mutex;

pub type Client = SplitSink<WebSocket, Message>;

#[derive(Debug)]
pub struct WebSocketClientList {
    whiteboard_clients: Mutex<HashMap<String, Vec<Client>>>,
}

impl WebSocketClientList {
    pub fn new() -> Self {
        Self {
            whiteboard_clients: Mutex::new(HashMap::new()),
        }
    }

    pub async fn add_client(&self, whiteboard_id: &str, client: Client) {
        let mut hash_map = self.whiteboard_clients.lock().await;
        let entry = hash_map
            .entry(whiteboard_id.to_string())
            .or_insert_with(Vec::new);
        entry.push(client);
    }

    pub async fn broadcast(&self, whiteboard_id: &str, message: &str) {
        let mut map = self.whiteboard_clients.lock().await;

        if let Some(clients) = map.get_mut(whiteboard_id) {
            let mut failed_indices = Vec::new();

            for (index, client) in clients.iter_mut().enumerate() {
                if client.send(Message::Text(message.into())).await.is_err() {
                    failed_indices.push(index);
                }
            }

            for &index in failed_indices.iter().rev() {
                let _ = clients.swap_remove(index);
            }
        }
    }
}
