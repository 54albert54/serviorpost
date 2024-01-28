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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const auth_1 = require("../../auth");
const mySql_1 = require("../../store/mySql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const controller = (TABLA, injectedStored) => {
    let store = injectedStored || null;
    if (!store) {
        store = mySql_1.store;
    }
    function query(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield store.query(TABLA, { userName });
            return bcryptjs_1.default.compare(password, data[0].password).then(isMatch => {
                if (isMatch === true) {
                    //! General TOKEN
                    const token = auth_1.auth.sign(data[0]);
                    const _a = data[0], { password } = _a, showData = __rest(_a, ["password"]);
                    // add token a user went login
                    return { showData, token };
                }
                else {
                    throw new Error("incorrect password");
                }
            });
        });
    }
    function upset(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const authData = {
                id: data.id,
            };
            if (data.name) {
                authData.name = data.name;
            }
            if (data.userName) {
                authData.userName = data.userName;
            }
            if (data.password) {
                authData.password = yield bcryptjs_1.default.hash(data.password, 5);
            }
            yield store.upset(TABLA, authData);
        });
    }
    function update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            store.update(TABLA, data);
        });
    }
    return { upset, query, update };
};
exports.controller = controller;
