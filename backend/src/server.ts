import "module-alias/register";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import newsRoutes from "@/routes/newsRoutes";
import { getEnvVar } from "@/config/getEnvVar";
import { connect } from "@/database/connect";

dotenv.config({ path: ".env" });

connect();

const app = express();
app.use(cors());

app.use("/", newsRoutes);

const port = getEnvVar("PORT");
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
