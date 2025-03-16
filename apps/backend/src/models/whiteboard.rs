use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::whiteboards)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Whiteboard {
    pub id: Uuid,
    pub name: String,
    pub password: Option<String>,
}

#[derive(Serialize, Selectable, Queryable)]
#[diesel(table_name = crate::schema::whiteboards)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct WhiteboardSummary {
    pub id: Uuid,
    pub name: String,
}
