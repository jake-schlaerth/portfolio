import { sequelizeClient } from "@/sequelize";
import { getModels } from "databasemodels";

const { Location } = getModels(sequelizeClient);

export const getLocationsFromDatabase = async () =>
  await Location.findAll({
    order: [["createdAt", "DESC"]],
    limit: 200,
  });
