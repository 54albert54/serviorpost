"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dummy_schema_1 = require("../../store/dummy.schema");
const mySql_1 = require("../../store/mySql");
const controller_1 = require("./controller");
exports.default = () => (0, controller_1.controller)(dummy_schema_1.TABLA.POST, mySql_1.store);
