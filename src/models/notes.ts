import Sequelize from "sequelize";
import { db } from "../sequalizeDB";

export const Note = db.define(
  "notes",
  {
    id: {
      type: Sequelize.STRING,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    archived: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    note: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dates: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
