import { SequelizeStorage, Umzug } from "umzug";

import { sequelizeClient } from "@/databaseClient";

export const umzugClient = new Umzug({
  migrations: { glob: "dist/migrations/*.js" },
  context: sequelizeClient.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: sequelizeClient }),
  logger: console,
});

export type Migration = typeof umzugClient._types.migration;
