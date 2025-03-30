use axum::extract::ws::{Message, WebSocket};
use futures::SinkExt;
use futures::stream::SplitSink;
use std::collections::HashMap;
use tokio::sync::Mutex;
use uuid::Uuid;

pub type Client = SplitSink<WebSocket, Message>;

#[derive(Debug)]
pub struct WebSocketClientList {
    whiteboard_clients: Mutex<HashMap<String, Vec<(Uuid, Client)>>>,
}

impl WebSocketClientList {
    pub fn new() -> Self {
        Self {
            whiteboard_clients: Mutex::new(HashMap::new()),
        }
    }

    pub async fn add_client(&self, whiteboard_id: &str, client: Client) -> Uuid {
        let client_id = Uuid::new_v4();
        let mut hash_map = self.whiteboard_clients.lock().await;
        let entry = hash_map
            .entry(whiteboard_id.to_string())
            .or_insert_with(Vec::new);
        entry.push((client_id, client));
        client_id
    }

    pub async fn broadcast(&self, whiteboard_id: &str, message: &str, sender_id: Uuid) {
        let mut map = self.whiteboard_clients.lock().await;

        if let Some(clients) = map.get_mut(whiteboard_id) {
            let mut failed_indices = Vec::new();

            for (index, (client_id, client)) in clients.iter_mut().enumerate() {
                // Skip sending message back to the sender
                if *client_id == sender_id {
                    continue;
                }
                
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
