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
const express_1 = __importDefault(require("express"));
const response_1 = require("../network/response");
const mySql_1 = require("../store/mySql");
const index_1 = __importDefault(require("../api/auth/index"));
const auth_1 = require("../auth");
const routeMySqlServices = express_1.default.Router();
routeMySqlServices.get('/:table', list);
routeMySqlServices.get('/:table/:id', get);
routeMySqlServices.post('/:table', insert);
routeMySqlServices.put('/:table/:id', upsert);
//  routeMySqlServices.post('/auth/login', login)
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const datos = yield mySql_1.store.list(req.params.table);
        (0, response_1.estatusSuccess)({ res, req, message: datos });
    });
}
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const datos = yield mySql_1.store.get(req.params.table, req.params.id);
        (0, response_1.estatusSuccess)({ res, req, message: datos });
    });
}
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = (0, auth_1.decodeHeader)(req);
        const datos = yield mySql_1.store.upset(req.params.table, req.body, req.params.id);
        (0, response_1.estatusSuccess)({ res, req, message: datos });
    });
}
function upsert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const datos = yield mySql_1.store.upset(req.params.table, req.body, req.params.id);
        (0, response_1.estatusSuccess)({ res, req, message: datos });
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userName, password } = req.body;
        const datos = yield (0, index_1.default)().query(userName, password);
        (0, response_1.estatusSuccess)({ res, req, message: datos });
    });
}
exports.default = routeMySqlServices;
