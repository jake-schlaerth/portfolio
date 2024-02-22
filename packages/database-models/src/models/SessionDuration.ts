import {
  DataTypes,
  type ModelDefined,
  type Optional,
  type Sequelize,
} from "sequelize";

export interface SessionDurationAttributes {
  duration: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export type SessionDurationCreationAttributes = Optional<
  SessionDurationAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export type SessionDurationModelType = ModelDefined<
  SessionDurationAttributes,
  SessionDurationCreationAttributes
>;

export const defineSessionDurationModel = (sequelizeClient: Sequelize) => {
  const SessionDuration = sequelizeClient.define("sessionDuration", {
    duration: DataTypes.NUMBER,
  });

  return SessionDuration;
};
