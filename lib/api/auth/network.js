"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = __importDefault(require("express"));
const response_1 = require("../../network/response");
const index_1 = __importDefault(require("./index"));
const routerAuth = express_1.default.Router();
exports.routerAuth = routerAuth;
routerAuth.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    (0, index_1.default)()
        .query(userName, password)
        .then((datos) => {
        (0, response_1.estatusSuccess)({ req, res, message: datos });
    })
        .catch((error) => (0, response_1.estatusError)({ req, res, message: 'error catch password ' + error }));
}));
