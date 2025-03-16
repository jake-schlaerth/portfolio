use axum::extract::State;

use crate::schema::users::dsl::*;
use crate::{app::app_router::AppState, models::user::User};
use diesel::prelude::*;

pub async fn handler(State(state): State<AppState>) -> String {
    let mut database_connection = state.database.get_connection();

    let results = users
        .limit(5)
        .select(User::as_select())
        .load(&mut database_connection)
        .expect("Error loading posts");

    let mut output = String::new();
    output.push_str(&format!("Displaying {} users\n", results.len()));
    for user in results {
        output.push_str(&format!("{}\n", user.name));
        output.push_str("-----------\n");
        output.push_str(&format!("{}\n", user.email));
    }

    output
}
