import { SequelizeStorage, Umzug } from "umzug";

import { sequelizeClient } from "@/databaseClient";

export const umzugClient = new Umzug({
  migrations: { glob: "src/migrations/*.ts" },
  context: sequelizeClient.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: sequelizeClient }),
  logger: console,
});

export type Migration = typeof umzugClient._types.migration;
