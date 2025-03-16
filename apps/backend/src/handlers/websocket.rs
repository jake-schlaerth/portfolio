use crate::websocket_client_list::WebSocketClientList;
use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    response::IntoResponse,
};
use futures::StreamExt;

pub async fn ws_handler(
    web_socket_upgrade: WebSocketUpgrade,
    clients: WebSocketClientList,
) -> impl IntoResponse {
    web_socket_upgrade.on_upgrade(move |web_socket| handle_web_socket(web_socket, clients))
}

async fn handle_web_socket(web_socket: WebSocket, clients: WebSocketClientList) {
    let (sender, mut receiver) = web_socket.split();

    clients.add_client(sender).await;

    while let Some(Ok(received_message)) = receiver.next().await {
        if let Message::Text(text) = received_message {
            println!("Received: {}", text);
            clients.broadcast(&text).await;
        }
    }
}
