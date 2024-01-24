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
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const auth_1 = require("../../auth");
const dummyDataBase_1 = require("../../store/dummyDataBase");
const controller = (TABLA, injectedStored) => {
    let store = injectedStored || null;
    if (!store) {
        store = dummyDataBase_1.store;
    }
    function query(userName, passwords) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield store.query(TABLA, { userName });
            if (data.passwords === passwords) {
                //! General TOKEN
                const token = auth_1.auth.sign(passwords);
                return token;
            }
            else {
                throw new Error('incorrect password');
            }
        });
    }
    function upset(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield store.upset(TABLA, data);
        });
    }
    return { upset, query };
};
exports.controller = controller;
