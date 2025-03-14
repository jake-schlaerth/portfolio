use crate::db::establish_connection;

pub async fn root() -> &'static str {
    let pool = establish_connection();

    pool.get().unwrap();
    "hello, cruel world!"
}
