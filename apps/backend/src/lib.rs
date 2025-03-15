pub mod app;

pub use app::App;

pub mod handlers {
    pub mod root;
    pub mod websocket;
}

pub mod schema;

pub mod db;

pub mod websocket_clients;

pub mod models {
    pub mod user;
}
