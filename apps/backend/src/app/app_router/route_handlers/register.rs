use axum::{Json, extract::State};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::app::app_router::AppState;
use crate::schema::sessions::dsl::*;

#[derive(Deserialize)]
pub struct RegisterRequest {
    name: String,
}

#[derive(Serialize)]
pub struct RegisterResponse {
    id: Uuid,
}

pub async fn handler(
    State(state): State<AppState>,
    Json(payload): Json<RegisterRequest>,
) -> Json<RegisterResponse> {
    let mut database_connection = state.database.get_connection();

    println!("Registering session with name: {}", payload.name);
    let new_session_id = diesel::insert_into(sessions)
        .values((name.eq(payload.name),))
        .returning(id)
        .get_result::<Uuid>(&mut database_connection)
        .expect("Error inserting session");

    Json(RegisterResponse { id: new_session_id })
}
