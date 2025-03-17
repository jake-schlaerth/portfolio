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
use uuid::Uuid;

use crate::{
    app::app_router::app_state::AppState, database::Database,
    web_socket_client_list::WebSocketClientList,
};

use crate::models::whiteboard_event::NewWhiteboardEvent;
use crate::schema::whiteboard_events::dsl::*;
use diesel::prelude::*;

#[derive(Deserialize)]
pub struct WhiteboardQuery {
    id: String,
}

pub async fn handler(
    Query(query): Query<WhiteboardQuery>,
    State(state): State<AppState>,
    web_socket_upgrade: WebSocketUpgrade,
) -> impl IntoResponse {
    println!("Websocket connection requested");
    let whiteboard_identifier = query.id.to_string();
    println!("Whiteboard ID: {}", whiteboard_identifier);
    let client_list = state.web_socket_client_list.clone();

    web_socket_upgrade.on_upgrade(move |web_socket| async move {
        on_upgrade_callback(
            web_socket,
            whiteboard_identifier,
            client_list,
            state.database.clone(),
        )
        .await
    })
}

async fn on_upgrade_callback(
    web_socket: WebSocket,
    whiteboard_identifier: String,
    client_list: Arc<WebSocketClientList>,
    database: Database,
) {
    let (sender, mut receiver) = web_socket.split();

    println!("Client connected to whiteboard: {}", whiteboard_identifier);
    client_list.add_client(&whiteboard_identifier, sender).await;

    while let Some(Ok(received_message)) = receiver.next().await {
        if let Message::Text(text) = received_message {
            println!("Received: {}", text);

            if let Ok(json_value) = serde_json::from_str::<serde_json::Value>(&text) {
                let extracted_payload = if let Some(payload_value) = json_value.get("payload") {
                    payload_value.clone()
                } else {
                    json_value
                };

                let mut database_connection = database.get_connection();

                println!("Inserting event into database");
                println!("Whiteboard ID: {}", whiteboard_identifier);
                println!("Payload: {}", extracted_payload);

                diesel::insert_into(whiteboard_events)
                    .values(NewWhiteboardEvent {
                        whiteboard_id: uuid::Uuid::parse_str(&whiteboard_identifier).unwrap(),
                        event_type: "draw".to_string(),
                        payload: extracted_payload,
                    })
                    .returning(id)
                    .get_result::<Uuid>(&mut database_connection)
                    .expect("Error inserting session");

                client_list.broadcast(&whiteboard_identifier, &text).await;
            } else {
                println!("Failed to parse JSON");
            }
        }
    }
}

// async fn handle_received_message(
//     message: Message,
//     whiteboard_id: &str,
//     client_list: Arc<WebSocketClientList>,

// ) {
//     if let Message::Text(text) = message {
//         println!("Received: {}", text);
//         client_list.broadcast(whiteboard_id, &text).await;
//     }
// }
