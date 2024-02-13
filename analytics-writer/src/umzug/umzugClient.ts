import { SequelizeStorage, Umzug } from "umzug";

import { sequelizeClient } from "@/sequelize";

export const umzug = new Umzug({
  migrations: { glob: "src/migrations/*.ts" },
  context: sequelizeClient.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: sequelizeClient }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;
