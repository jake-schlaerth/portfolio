import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config({ path: "/app/.env" });

const app = express();
app.use(cors());
const PORT = 3001;

app.get("/", (req, res) => {
  res.json({
    data: "asdfHello from TypeScript backend!",
    apiKey: process.env.NEXT_PUBLIC_NEWSAPI_KEY,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
