use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Selectable, Debug, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::whiteboard_events)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct WhiteboardEvent {
    pub id: Uuid,
    pub whiteboard_id: Uuid,
    pub event_type: String,
    pub payload: serde_json::Value,
    pub created_at: Option<NaiveDateTime>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::whiteboard_events)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewWhiteboardEvent {
    pub whiteboard_id: Uuid,
    pub event_type: String,
    pub payload: serde_json::Value,
}
