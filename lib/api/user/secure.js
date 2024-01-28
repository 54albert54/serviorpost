"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const auth_1 = require("../../auth");
const checkAuth = (action) => {
    // 
    const middleware = (req, res, next) => {
        switch (action) {
            case "update":
                const owner = req.body.id;
                auth_1.auth.check.own(req, owner);
                next();
                break;
            case "follow":
                const dataFollow = auth_1.auth.check.follow(req);
                if (dataFollow) {
                    next();
                }
                break;
            case "delete":
                const dataDelete = auth_1.auth.check.follow(req);
                if (dataDelete) {
                    next();
                }
                break;
            default:
                next();
                break;
        }
    };
    return middleware;
};
exports.checkAuth = checkAuth;
