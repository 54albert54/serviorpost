"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const network_1 = require("../api/user/network");
const network_2 = require("../api/auth/network");
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../api/swagger.json');
const routerApi = (app) => {
    const router = express_1.default.Router();
    app.use('/api', router);
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    router.use('/user', network_1.routerUser);
    router.use('/auth', network_2.routerAuth);
};
exports.default = routerApi;
