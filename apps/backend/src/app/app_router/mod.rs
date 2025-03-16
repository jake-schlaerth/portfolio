use axum::{Router, routing::get};

mod route_handlers {
    pub mod root;
    pub mod web_socket;
}

use route_handlers::*;

use crate::{database::Database, web_socket_client_list::WebSocketClientList};

pub struct AppRouter {
    pub router: Router,
}

impl AppRouter {
    pub fn new() -> Self {
        let websocket_client_list = WebSocketClientList::new();
        let router = Router::new().route("/", get(root::handler)).route(
            "/websocket",
            get(move |web_socket_upgrade| {
                web_socket::handler(web_socket_upgrade, websocket_client_list.clone())
            }),
        );

        Self { router }
    }
}
