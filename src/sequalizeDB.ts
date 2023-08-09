import { Sequelize } from "sequelize";

export const db = new Sequelize("node-db", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});
