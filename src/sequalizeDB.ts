import { Sequelize } from "sequelize";

export const db = new Sequelize("node-db", "postgres", "root", {
  host: "db",
  dialect: "postgres",
});
