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
const dummyDataBase_1 = require("../../store/dummyDataBase");
const uuid_1 = require("uuid");
const auth_1 = __importDefault(require("../auth"));
const controller = (TABLA, injectedStored) => {
    let store = injectedStored || null;
    if (!store) {
        store = dummyDataBase_1.store;
    }
    function list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield store.list(TABLA);
        });
    }
    function get(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield store.get(TABLA, name);
        });
    }
    function upset(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.id = (0, uuid_1.v4)();
            (0, auth_1.default)(store).upset({
                name: data.name,
                id: data.id,
                userName: data.userName,
                passwords: data.passwords,
            });
            const { passwords } = data, dataUser = __rest(data
            // delete  data.passwords 
            , ["passwords"]);
            // delete  data.passwords 
            yield store.upset(TABLA, dataUser);
        });
    }
    function remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield store.remove(TABLA, id);
        });
    }
    return { list, get, upset, remove };
};
exports.controller = controller;
