"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dummy_schema_1 = require("../../store/dummy.schema");
const controller_1 = require("./controller");
const mySql_1 = require("../../store/mySql");
exports.default = () => (0, controller_1.controller)(dummy_schema_1.TABLA.AUTH, mySql_1.store);
