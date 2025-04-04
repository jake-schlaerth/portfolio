use axum::{
    Json,
    extract::{Query, State},
};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::{
    app::app_router::AppState, models::whiteboard::WhiteboardSummary, schema::whiteboards::dsl::*,
};

#[derive(Deserialize)]
pub struct Pagination {
    limit: Option<i64>,
    offset: Option<i64>,
}

#[derive(Serialize)]
pub struct WhiteboardListResponse {
    whiteboards: Vec<WhiteboardSummary>,
    total_count: i64,
}

pub async fn handler(
    State(state): State<AppState>,
    Query(pagination): Query<Pagination>,
) -> Json<WhiteboardListResponse> {
    let mut database_connection = state.database.get_connection();

    let limit = pagination.limit.unwrap_or(10).clamp(1, 20);
    let offset = pagination.offset.unwrap_or(0);

    let results = whiteboards
        .select((id, name))
        .limit(limit)
        .offset(offset)
        .load::<WhiteboardSummary>(&mut database_connection)
        .expect("Error loading whiteboards");

    let total_count = whiteboards
        .count()
        .get_result::<i64>(&mut database_connection)
        .expect("Error counting whiteboards");

    Json(WhiteboardListResponse {
        whiteboards: results,
        total_count,
    })
}
