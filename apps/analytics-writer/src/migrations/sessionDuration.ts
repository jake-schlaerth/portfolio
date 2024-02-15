import { Migration } from "@/umzug";
import { DataTypes } from "sequelize";

export const up: Migration = ({ context: queryInterface }) => {
  return queryInterface.createTable("sessionDurations", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    duration: {
      type: DataTypes.INTEGER,
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
  queryInterface.dropTable("sessionDurations");
