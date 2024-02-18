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

export const definePageViewModel = (sequelizeClient: Sequelize) => {
  const PageView: ModelDefined<PageViewAttributes, PageViewCreationAttributes> =
    sequelizeClient.define("pageView", {
      url: DataTypes.STRING,
    });

  return PageView;
};
