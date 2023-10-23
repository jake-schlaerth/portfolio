import mongoose from "mongoose";

import { getEnvVar } from "@/config/getEnvVar";

export const connect = async () => {
  try {
    await mongoose.connect(getEnvVar("DB_CONNECTION_STRING"));
  } catch (error) {
    console.log(`error connecting to db:${error}`);
  }
};
