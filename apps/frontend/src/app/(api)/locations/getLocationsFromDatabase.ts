import { sequelizeClient } from "@/sequelize";
import { getModels } from "database-models";

const { Location } = getModels(sequelizeClient);

export const getLocationsFromDatabase = async () =>
  await Location.findAll({
    attributes: ["latitude", "longitude"],
    order: [["createdAt", "DESC"]],
    limit: 200,
  });
