// migrations/00_initial.ts
import { Migration } from "@/umzugClient";
import { DataTypes } from "sequelize";

export const up: Migration = ({ context: queryInterface }) => {
  return queryInterface.createTable("pageViews", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

export const down: Migration = ({ context: queryInterface }) =>
  queryInterface.dropTable("pageView");
