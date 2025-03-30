use axum::{
    extract::{Path, State},
    http::StatusCode,
};
use diesel::prelude::*;
use uuid::Uuid;

use crate::{
    app::app_router::AppState,
    schema::{
        whiteboard_events::dsl::{whiteboard_events, whiteboard_id as event_whiteboard_id},
        whiteboards::dsl::{whiteboards, id as whiteboard_id},
    },
};

pub async fn handler(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
) -> Result<(), StatusCode> {
    let mut database_connection = state.database.get_connection();

    // First delete all events associated with the whiteboard
    diesel::delete(whiteboard_events)
        .filter(event_whiteboard_id.eq(id))
        .execute(&mut database_connection)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    // Then delete the whiteboard itself
    diesel::delete(whiteboards)
        .filter(whiteboard_id.eq(id))
        .execute(&mut database_connection)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(())
} 