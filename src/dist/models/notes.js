"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const sequalizeDB_1 = require("../sequalizeDB");
exports.Note = sequalizeDB_1.db.define("notes", {
    id: {
        type: sequelize_1.default.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    archived: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
    },
    note: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    created: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    dates: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
});
