"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const router_1 = __importDefault(require("../router"));
// import swaggerUi  from 'swagger-ui-express'
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("../config");
const error_1 = __importDefault(require("../network/error"));
const remote_1 = __importDefault(require("../store/remote"));
const app = (0, express_1.default)();
const port = config_1.config.port || 3000;
app.use(body_parser_1.default.json()); // Para manejar solicitudes con formato JSON
// app.use(bodyParser.urlencoded({ extended: true })); // Para manejar solicitudes con formato de formulario
app.use(express_1.default.static("public"));
app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
    //res.send('esto es desde mi archivo index');
});
//Routers
(0, router_1.default)(app);
//connect()
(0, remote_1.default)('get', 'http://localhost', 3001);
//las for error response
app.use(error_1.default);
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
