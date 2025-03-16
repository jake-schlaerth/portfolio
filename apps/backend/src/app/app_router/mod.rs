use axum::{
    Router,
    routing::{get, post},
};
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

mod route_handlers {
    pub mod register;
    pub mod root;
    pub mod web_socket;
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
            .route("/", get(root::handler))
            .route("/web_socket", get(web_socket::handler))
            .route("/register", post(register::handler))
            .with_state(AppState::new())
            .layer(CorsLayer::permissive())
            .layer(TraceLayer::new_for_http());

        Self { router }
    }
}
