import { Sequelize } from "sequelize";

import { getEnvVar } from "utils";

const dbUser = getEnvVar("DB_USER");
const dbPassword = getEnvVar("DB_PASSWORD");
const dbUri = getEnvVar("DB_URI");
const dbName = getEnvVar("DB_NAME");
const sslMode = getEnvVar("DB_SSL_MODE");

export const sequelizeClient = new Sequelize(
  `postgresql://${dbUser}:${dbPassword}@${dbUri}/${dbName}?sslmode=${sslMode}`
);
