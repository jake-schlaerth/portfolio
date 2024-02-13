import { sequelizeClient } from "@/sequelize";
import { DataTypes } from "sequelize";

export const PageView = sequelizeClient.define("pageView", {
  url: DataTypes.STRING,
});

// todo: look at this
