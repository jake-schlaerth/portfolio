use diesel::pg::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool, PooledConnection};
use dotenvy::dotenv;
use std::env;

type DatabasePool = Pool<ConnectionManager<PgConnection>>;
type DatabaseConnection = PooledConnection<ConnectionManager<PgConnection>>;

#[derive(Clone)]
pub struct Database {
    database_pool: DatabasePool,
}

impl Database {
    pub fn new() -> Self {
        Self {
            database_pool: Self::create_database_pool(),
        }
    }

    fn create_database_pool() -> DatabasePool {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let manager = ConnectionManager::<PgConnection>::new(database_url);

        Pool::builder()
            .build(manager)
            .expect("Failed to create database pool")
    }

    pub fn get_connection(&self) -> DatabaseConnection {
        self.database_pool
            .get()
            .expect("Failed to get database connection")
    }
}
