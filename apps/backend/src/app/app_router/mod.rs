use axum::{Router, routing::get};

use crate::{
    handlers::{root::root, websocket::ws_handler},
    websocket_client_list::WebSocketClientList,
};

pub struct AppRouter {
    pub router: Router,
}

impl AppRouter {
    pub fn new(clients: WebSocketClientList) -> Self {
        let router = Router::new().route("/", get(root)).route(
            "/ws",
            get(move |web_socket_upgrade| ws_handler(web_socket_upgrade, clients.clone())),
        );

        Self { router }
    }
}
