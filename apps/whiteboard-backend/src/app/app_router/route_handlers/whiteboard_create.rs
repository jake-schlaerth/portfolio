use axum::{Json, extract::State};
// use bcrypt;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{app::app_router::AppState, schema::whiteboards::dsl::*};

#[derive(Deserialize)]
pub struct CreateWhiteboardRequest {
    name: String,
    password: Option<String>,
}

#[derive(Serialize)]
pub struct CreateWhiteboardResponse {
    id: Uuid,
}

pub async fn handler(
    State(state): State<AppState>,
    Json(payload): Json<CreateWhiteboardRequest>,
) -> Json<CreateWhiteboardResponse> {
    let mut database_connection = state.database.get_connection();

    let hashed_password = match &payload.password {
        Some(pass) => {
            Some(bcrypt::hash(pass, bcrypt::DEFAULT_COST).expect("Failed to hash password"))
        }
        None => None,
    };

    let new_whiteboard_id = diesel::insert_into(whiteboards)
        .values((name.eq(payload.name), password.eq(hashed_password)))
        .returning(id)
        .get_result::<Uuid>(&mut database_connection)
        .expect("Failed to insert whiteboard");

    Json(CreateWhiteboardResponse {
        id: new_whiteboard_id,
    })
}
