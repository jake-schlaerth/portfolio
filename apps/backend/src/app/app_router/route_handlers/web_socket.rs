use crate::app::app_router::app_state::AppState;
use crate::web_socket_client_list::WebSocketClientList;
use axum::{
    extract::{
        State,
        ws::{Message, WebSocket, WebSocketUpgrade},
    },
    response::IntoResponse,
};
use futures::StreamExt;
use std::sync::Arc;

pub async fn handler(
    State(state): State<AppState>,
    web_socket_upgrade: WebSocketUpgrade,
) -> impl IntoResponse {
    let client_list = state.web_socket_client_list.clone();

    web_socket_upgrade.on_upgrade(move |web_socket| on_upgrade_callback(web_socket, client_list))
}

async fn on_upgrade_callback(web_socket: WebSocket, client_list: Arc<WebSocketClientList>) {
    let (sender, mut receiver) = web_socket.split();

    client_list.add_client(sender).await;

    while let Some(Ok(received_message)) = receiver.next().await {
        if let Message::Text(text) = received_message {
            println!("Received: {}", text);
            client_list.broadcast(&text).await;
        }
    }
}
