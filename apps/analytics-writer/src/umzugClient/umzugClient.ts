import { SequelizeStorage, Umzug } from "umzug";

import { sequelizeClient } from "@/databaseClient";

export const umzugClient = new Umzug({
  migrations: { glob: "apps/analytics-writer/dist/migrations/*.js" }, // todo: figure this out
  context: sequelizeClient.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: sequelizeClient }),
  logger: console,
});

export type Migration = typeof umzugClient._types.migration;
