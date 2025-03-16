use axum::{Router, routing::get};

mod route_handlers {
    pub mod root;
    pub mod web_socket;
}

mod app_state;
pub use app_state::AppState;

use route_handlers::*;

pub struct AppRouter {
    pub router: Router,
}

impl AppRouter {
    pub fn new() -> Self {
        let router = Router::new()
            .route("/", get(root::handler))
            .route("/web_socket", get(web_socket::handler))
            .with_state(AppState::new());

        Self { router }
    }
}
