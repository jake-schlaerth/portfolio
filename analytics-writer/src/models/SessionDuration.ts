import { DataTypes, ModelDefined, Optional } from "sequelize";

import { sequelizeClient } from "@/sequelize";

interface SessionDurationAttributes {
  duration: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

type SessionDurationCreationAttributes = Optional<
  SessionDurationAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export const SessionDuration: ModelDefined<
  SessionDurationAttributes,
  SessionDurationCreationAttributes
> = sequelizeClient.define("sessionDuration", {
  duration: DataTypes.NUMBER,
});
