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
exports.routerPosts = void 0;
const express_1 = __importDefault(require("express"));
const response_1 = require("../../network/response");
const index_1 = __importDefault(require("./index"));
const auth_1 = require("../../auth");
const secure_1 = require("../user/secure");
const routerPosts = express_1.default.Router();
exports.routerPosts = routerPosts;
routerPosts.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, index_1.default)()
        .list()
        .then((list) => (0, response_1.estatusSuccess)({ req, res, message: list }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
routerPosts.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, index_1.default)()
        .get(req.params.id)
        .then((list) => (0, response_1.estatusSuccess)({ req, res, message: list }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
// editar ya un post
routerPosts.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paramsId = req.params.id;
    const dataPost = req.body;
    // res.json({paramsId , dataPost})
    try {
        const user = (0, auth_1.decodeHeader)(req) || "ss ";
        if (user.id === undefined) {
            res.json({ msj: "you need sing in before create a post" });
        }
        else {
            const dataPost = {};
            if (req.body.title) {
                dataPost.title = req.body.title;
            }
            if (req.body.detail) {
                dataPost.detail = req.body.detail;
            }
            (0, index_1.default)()
                .updatePost(dataPost, paramsId, user.id)
                .then(() => (0, response_1.estatusSuccess)({
                req,
                res,
                message: "you change the post successful " + paramsId,
            }))
                .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
        }
    }
    catch (error) {
        res.json({ msj: "you need sing in before create a post" });
    }
}));
routerPosts.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    try {
        const user = (0, auth_1.decodeHeader)(req) || "ss ";
        if (user.id === undefined) {
            res.json({ msj: "you need sing in before create a post" });
        }
        else {
            const dataPost = {
                title: req.body.title,
                detail: req.body.detail,
                owner_id: user.id,
            };
            (0, index_1.default)()
                .upset(dataPost)
                .then(() => (0, response_1.estatusSuccess)({
                req,
                res,
                message: "se creo post del usuario " + dataPost.owner_id,
            }))
                .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
        }
    }
    catch (error) {
        res.json({ msj: "you need sing in before create a post" });
    }
}));
routerPosts.post("/like/:id", 
//middleware
(0, secure_1.checkAuth)('follow'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (0, auth_1.decodeHeader)(req);
    (0, index_1.default)()
        .follow(data.id, (_a = req.params) === null || _a === void 0 ? void 0 : _a.id)
        .then((user) => (0, response_1.estatusSuccess)({ req, res, message: "update user info" + user }))
        .catch((error) => (0, response_1.estatusError)({ req, res, message: "error " + error }));
}));
