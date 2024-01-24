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
exports.routerUser = void 0;
const express_1 = __importDefault(require("express"));
const response_1 = require("../../network/response");
const index_1 = __importDefault(require("./index"));
const dummyDataBase_1 = require("../../store/dummyDataBase");
const routerUser = express_1.default.Router();
exports.routerUser = routerUser;
routerUser.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, index_1.default)(dummyDataBase_1.store)
        .list()
        .then((list) => (0, response_1.estatusSuccess)({ req, res, message: list }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
routerUser.get("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, index_1.default)(dummyDataBase_1.store)
        .get(req.params.name)
        .then((user) => (0, response_1.estatusSuccess)({ req, res, message: user }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
// crear un usuario nuevo
routerUser.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    (0, index_1.default)(dummyDataBase_1.store)
        .upset(body)
        .then((user) => (0, response_1.estatusSuccess)({ req, res, message: "new user add " + user }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
routerUser.delete("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, index_1.default)(dummyDataBase_1.store)
        .remove(req.params.name)
        .then((user) => (0, response_1.estatusSuccess)({ req, res, message: user }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
