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
const secure_1 = require("./secure");
const auth_1 = require("../../auth");
const routerUser = express_1.default.Router();
exports.routerUser = routerUser;
routerUser.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, index_1.default)()
        .list()
        .then((list) => (0, response_1.estatusSuccess)({ req, res, message: list }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
routerUser.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, index_1.default)()
        .get(req.params.id)
        .then((user) => (0, response_1.estatusSuccess)({ req, res, message: user }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
// crear un usuario nuevo
routerUser.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    (0, index_1.default)()
        .upset(body)
        .then((user) => (0, response_1.estatusSuccess)({ req, res, message: { title: "new user add ", user } }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
// editar ya un usuario desde que este login
routerUser.put("/", 
//middleware
(0, secure_1.checkAuth)('update'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    (0, index_1.default)()
        .update(body)
        .then((user) => (0, response_1.estatusSuccess)({ req, res, message: "update user info" + user }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
// seguir un usuario
routerUser.post("/follow/:id", 
//middleware
(0, secure_1.checkAuth)('follow'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (0, auth_1.decodeHeader)(req);
    (0, index_1.default)()
        .follow(data.id, (_a = req.params) === null || _a === void 0 ? void 0 : _a.id)
        .then((user) => (0, response_1.estatusSuccess)({ req, res, message: "update user info" + user }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
routerUser.delete("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, index_1.default)()
        .remove(req.params.name)
        .then((user) => (0, response_1.estatusSuccess)({ req, res, message: user }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
