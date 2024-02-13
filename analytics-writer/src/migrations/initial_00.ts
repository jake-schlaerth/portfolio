// migrations/00_initial.ts
import { Migration } from "@/umzug";
import { DataTypes } from "sequelize";

export const up: Migration = ({ context: queryInterface }) => {
  return queryInterface.createTable("pageView", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
