use axum::{Router, routing::get};

use crate::handlers::root::root;

pub fn create_router() -> Router {
    Router::new().route("/", get(root))
}
