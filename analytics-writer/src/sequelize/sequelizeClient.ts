import { Sequelize } from "sequelize";

import { config } from "@/config";

const { dbName, dbUri, dbUser, dbPassword } = config;

export const sequelizeClient = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbUri}/${dbName}`
);
