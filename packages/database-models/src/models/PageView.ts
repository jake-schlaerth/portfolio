import {
  DataTypes,
  type ModelDefined,
  type Optional,
  type Sequelize,
} from "sequelize";

export interface PageViewAttributes {
  url: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export type PageViewCreationAttributes = Optional<
  PageViewAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export type PageViewModelType = ModelDefined<
  PageViewAttributes,
  PageViewCreationAttributes
>;

export const definePageViewModel = (sequelizeClient: Sequelize) => {
  const PageView = sequelizeClient.define("pageView", {
    url: DataTypes.STRING,
  });

  return PageView;
};
