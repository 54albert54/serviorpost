"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv").config();
exports.config = {
    isDev: process.env.ISDEV,
    port: process.env.PORT,
    secureKey: process.env.SECURE_KEY,
    mySql: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    mySqlServices: {
        port: process.env.MySqlPORT,
    },
};
