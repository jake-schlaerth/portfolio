import {
  DataTypes,
  type ModelDefined,
  type Optional,
  type Sequelize,
} from "sequelize";

export interface LocationAttributes {
  id: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export type LocationCreationAttributes = Optional<
  LocationAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export type LocationModelType = ModelDefined<
  LocationAttributes,
  LocationCreationAttributes
>;

export const defineLocationModel = (sequelizeClient: Sequelize) => {
  const Location = sequelizeClient.define("location", {
    latitude: DataTypes.REAL,
    longitude: DataTypes.REAL,
  });

  return Location;
};
