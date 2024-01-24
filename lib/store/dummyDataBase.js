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
exports.store = void 0;
const db = {
    user: [
        {
            id: "1",
            name: "prueba userData",
            userName: "prueba",
            passwords: "12345",
        },
    ],
    auth: [
        {
            id: "1",
            name: "prueba authData",
            passwords: "12345",
            userName: "prueba",
        },
    ],
};
function list(table) {
    return __awaiter(this, void 0, void 0, function* () {
        return db[table] || [];
    });
}
function get(table, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const col = yield list(table);
        let response;
        if (col != undefined) {
            response = col.find((element) => (element === null || element === void 0 ? void 0 : element.name) == name);
        }
        return response;
    });
}
function upset(table, data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db[table]) {
            db[table] = [];
        }
        if (db[table] != undefined) {
            db[table].push(data);
        }
        return data;
    });
}
function remove(table, name) {
    // const newData = db[table]!.filter((datos) => datos.id != name);
    // db[table]; = newData
}
function query(table, q) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = Object.keys(q)[0];
        const col = yield list(table);
        let response = col.find((element) => element[key] == q[key]);
        return response;
    });
}
exports.store = {
    db,
    list,
    get,
    upset,
    remove,
    query,
};
