use axum::serve;
use tokio::net::TcpListener;

use crate::routes::create_router;

pub async fn run_app() {
    let router = create_router();

    let tcp_listener = TcpListener::bind("0.0.0.0:8080")
        .await
        .expect("Failed to bind to address");

    serve(tcp_listener, router).await.expect("Server error");
}
