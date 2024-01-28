"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const otherWay = (METHOD, HOST, PORT) => {
    (0, axios_1.default)({
        method: METHOD,
        url: `${HOST}:${PORT}/post`,
        headers: {},
        data: {
            firstName: "Fred",
            lastName: "Flintstone",
        },
    })
        .then((data) => console.log("data", data.data))
        .catch((e) => console.log("no se a iniciado el servidor"));
};
exports.default = otherWay;
