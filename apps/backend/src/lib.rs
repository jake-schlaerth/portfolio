pub mod app;

pub use app::App;

pub mod schema;

pub mod database;

pub mod web_socket_client_list;

pub mod models {
    pub mod session;
    pub mod user;
    pub mod whiteboard;
    pub mod whiteboard_event;
}
