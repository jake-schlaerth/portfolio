use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
};
use diesel::prelude::*;
use uuid::Uuid;

use crate::{app::app_router::AppState, models::whiteboard_event::WhiteboardEvent};

pub async fn handler(
    State(state): State<AppState>,
    Path(requested_whiteboard_id): Path<Uuid>,
) -> Result<Json<Vec<WhiteboardEvent>>, StatusCode> {
    use crate::schema::whiteboard_events::dsl::*;

    let mut database_connection = state.database.get_connection();

    let events = whiteboard_events
        .filter(whiteboard_id.eq(requested_whiteboard_id))
        .select(WhiteboardEvent::as_select())
        .load::<WhiteboardEvent>(&mut database_connection)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(events))
}
