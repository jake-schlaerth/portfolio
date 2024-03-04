import { getModels } from "database-models";
import { sequelizeClient } from "@/databaseClient";

const models = getModels(sequelizeClient);

export const PageView = models.PageView;
export const Location = models.Location;
export const SessionDuration = models.SessionDuration;
