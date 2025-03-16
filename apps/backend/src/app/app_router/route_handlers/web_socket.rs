use crate::web_socket_client_list::WebSocketClientList;
use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    response::IntoResponse,
};
use futures::StreamExt;

pub async fn handler(
    web_socket_upgrade: WebSocketUpgrade,
    client_list: WebSocketClientList,
) -> impl IntoResponse {
    web_socket_upgrade.on_upgrade(move |web_socket| on_upgrade_callback(web_socket, client_list))
}

async fn on_upgrade_callback(web_socket: WebSocket, client_list: WebSocketClientList) {
    let (sender, mut receiver) = web_socket.split();

    client_list.add_client(sender).await;

    while let Some(Ok(received_message)) = receiver.next().await {
        if let Message::Text(text) = received_message {
            println!("Received: {}", text);
            client_list.broadcast(&text).await;
        }
    }
}
