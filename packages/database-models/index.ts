import { Sequelize } from "sequelize";

import {
  definePageViewModel,
  defineLocationModel,
  defineSessionDurationModel,
} from "./models";

export * from "./models";

export const getModels = (sequelizeClient: Sequelize) => {
  return {
    PageView: definePageViewModel(sequelizeClient),
    Location: defineLocationModel(sequelizeClient),
    SessionDuration: defineSessionDurationModel(sequelizeClient),
  };
};