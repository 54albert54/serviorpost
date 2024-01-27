"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.decodeHeader = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const secret = config_1.config.secureKey;
function sign(data) {
    return jsonwebtoken_1.default.sign(data, secret);
}
function getToken(auth) {
    if (!auth) {
        throw new Error(' Error al no venir token');
    }
    if (auth.indexOf('Bearer ') === -1) {
        throw new Error(' Error token invalido');
    }
    let token = auth.replace('Bearer ', '');
    return token;
}
function verify(token) {
    return jsonwebtoken_1.default.verify(token, secret);
}
function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);
    return decoded;
}
exports.decodeHeader = decodeHeader;
const check = {
    own: (req, owner) => {
        //decodificar lo que viene en el heather
        const decoded = decodeHeader(req);
        //TODO comprobar el decode 
        if (decoded.id !== owner) {
            throw new Error("you can't edit other user info");
        }
    },
    follow: (req) => {
        const decoded = decodeHeader(req);
        console.log('decoded.id  ', decoded.id);
        return decoded;
    }
};
exports.auth = {
    sign, check,
};
