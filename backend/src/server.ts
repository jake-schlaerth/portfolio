import "module-alias/register";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import { getConfig } from "@/config/config";
import newsRoutes from "@/routes/newsRoutes";

dotenv.config({ path: ".env" });
const config = getConfig();

mongoose
  .connect(config.DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

const app = express();
app.use(cors());

app.use("/", newsRoutes);

app.get("/", (req, res) => {
  res.json({
    data: "Hello from TypeScript backend!",
    apiKey: process.env.NEWSAPI_KEY,
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
