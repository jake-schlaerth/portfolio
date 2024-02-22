import { Sequelize } from "sequelize";

import {
  definePageViewModel,
  defineLocationModel,
  defineSessionDurationModel,
} from "./models";

export {
  PageViewModelType,
  LocationModelType,
  SessionDurationModelType,
} from "./models";

export const getModels = (sequelizeClient: Sequelize) => {
  return {
    PageView: definePageViewModel(sequelizeClient),
    Location: defineLocationModel(sequelizeClient),
    SessionDuration: defineSessionDurationModel(sequelizeClient),
  };
};
