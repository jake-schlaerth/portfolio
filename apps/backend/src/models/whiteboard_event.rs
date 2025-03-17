use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::whiteboard_events)]
pub struct WhiteboardEvent {
    pub whiteboard_id: Uuid,
    pub event_type: String,
    pub payload: serde_json::Value,
    pub created_at: NaiveDateTime,
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::whiteboard_events)]
pub struct NewWhiteboardEvent {
    pub whiteboard_id: Uuid,
    pub event_type: String,
    pub payload: serde_json::Value,
}
