use axum::{
    extract::{
        Query, State,
        ws::{Message, WebSocket, WebSocketUpgrade},
    },
    response::IntoResponse,
};
use futures::StreamExt;
use serde::Deserialize;
use std::sync::Arc;

use crate::{app::app_router::app_state::AppState, web_socket_client_list::WebSocketClientList};

#[derive(Deserialize)]
pub struct WhiteboardQuery {
    whiteboard_id: String,
}

pub async fn handler(
    Query(query): Query<WhiteboardQuery>,
    State(state): State<AppState>,
    web_socket_upgrade: WebSocketUpgrade,
) -> impl IntoResponse {
    let whiteboard_id = query.whiteboard_id.clone();
    let client_list = state.web_socket_client_list.clone();

    web_socket_upgrade.on_upgrade(move |web_socket| async move {
        on_upgrade_callback(web_socket, whiteboard_id, client_list).await
    })
}

async fn on_upgrade_callback(
    web_socket: WebSocket,
    whiteboard_id: String,
    client_list: Arc<WebSocketClientList>,
) {
    let (sender, mut receiver) = web_socket.split();

    client_list.add_client(&whiteboard_id, sender).await;

    while let Some(Ok(received_message)) = receiver.next().await {
        handle_received_message(received_message, &whiteboard_id, client_list.clone()).await;
    }
}

async fn handle_received_message(
    message: Message,
    whiteboard_id: &str,
    client_list: Arc<WebSocketClientList>,
) {
    if let Message::Text(text) = message {
        println!("Received: {}", text);
        client_list.broadcast(whiteboard_id, &text).await;
    }
}
