import { DataTypes, ModelDefined, Optional } from "sequelize";

import { sequelizeClient } from "@/sequelize";

interface LocationAttributes {
  id: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

type LocationCreationAttributes = Optional<
  LocationAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export const Location: ModelDefined<
  LocationAttributes,
  LocationCreationAttributes
> = sequelizeClient.define("location", {
  latitude: DataTypes.REAL,
  longitude: DataTypes.REAL,
});
