"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./response");
exports.default = (err, req, res, next) => {
    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;
    (0, response_1.estatusError)({ req, res, message: message, status });
};
