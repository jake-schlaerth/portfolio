use std::sync::Arc;

use crate::{database::Database, web_socket_client_list::WebSocketClientList};

#[derive(Clone)]
pub struct AppState {
    pub database: Database,
    pub web_socket_client_list: Arc<WebSocketClientList>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            database: Database::new(),
            web_socket_client_list: Arc::new(WebSocketClientList::new()),
        }
    }
}
