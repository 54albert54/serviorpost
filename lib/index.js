"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const router_1 = __importDefault(require("./router"));
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
const port = 3000;
app.use(bodyParser.json()); // Para manejar solicitudes con formato JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para manejar solicitudes con formato de formulario
app.use(express_1.default.static('public'));
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    //res.send('esto es desde mi archivo index');
});
(0, router_1.default)(app);
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
