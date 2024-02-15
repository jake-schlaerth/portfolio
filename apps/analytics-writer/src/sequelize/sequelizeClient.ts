import { getEnvVar } from "@/config";
import { Sequelize } from "sequelize";

const dbUser = getEnvVar("DB_USER");
const dbPassword = getEnvVar("DB_PASSWORD");
const dbUri = getEnvVar("DB_URI");
const dbName = getEnvVar("DB_NAME");

export const sequelizeClient = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbUri}/${dbName}`
);
