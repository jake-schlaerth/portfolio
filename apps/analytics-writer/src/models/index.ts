import { getModels } from "databasemodels";

import { sequelizeClient } from "@/sequelize";

const models = getModels(sequelizeClient);

export const PageView = models.PageView;
export const Location = models.Location;
export const SessionDuration = models.SessionDuration;
