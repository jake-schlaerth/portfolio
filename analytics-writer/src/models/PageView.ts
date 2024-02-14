import { DataTypes, ModelDefined, Optional } from "sequelize";

import { sequelizeClient } from "@/sequelize";

interface PageViewAttributes {
  url: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

type PageViewCreationAttributes = Optional<
  PageViewAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export const PageView: ModelDefined<
  PageViewAttributes,
  PageViewCreationAttributes
> = sequelizeClient.define("pageView", {
  url: DataTypes.STRING,
});
