use axum::{
    Router,
    routing::{get, post, delete},
};
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

mod route_handlers {
    pub mod web_socket;
    pub mod whiteboard_create;
    pub mod whiteboard_delete;
    pub mod whiteboard_history;
    pub mod whiteboard_list;
}
use route_handlers::*;

mod app_state;
pub use app_state::AppState;

pub struct AppRouter {
    pub router: Router,
}

impl AppRouter {
    pub fn new() -> Self {
        let router = Router::new()
            .route("/web_socket", get(web_socket::handler))
            .route("/whiteboard", post(whiteboard_create::handler))
            .route("/whiteboard", get(whiteboard_list::handler))
            .route("/whiteboard/{id}", delete(whiteboard_delete::handler))
            .route("/whiteboard/{id}/history", get(whiteboard_history::handler))
            .with_state(AppState::new())
            .layer(CorsLayer::permissive())
            .layer(TraceLayer::new_for_http());

        Self { router }
    }
}
