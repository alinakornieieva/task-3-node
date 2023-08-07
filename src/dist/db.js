"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "node-db",
});
exports.default = pool;
