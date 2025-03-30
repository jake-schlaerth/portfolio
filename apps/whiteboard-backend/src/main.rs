use backend::App;

#[tokio::main]
async fn main() {
    App::new().run().await;
}
