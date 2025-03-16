pub mod app_router;
use crate::websocket_client_list::WebSocketClientList;
use app_router::AppRouter;
use axum::{Router, serve};
use tokio::net::TcpListener;

pub struct App {
    router: Router,
}

impl App {
    pub fn new() -> Self {
        let clients = WebSocketClientList::new();
        let router = AppRouter::new(clients).router;

        Self { router }
    }

    pub async fn run(self) {
        let tcp_listener = TcpListener::bind("0.0.0.0:8080")
            .await
            .expect("Failed to bind to address");

        serve(tcp_listener, self.router)
            .await
            .expect("Server error");
    }
}
