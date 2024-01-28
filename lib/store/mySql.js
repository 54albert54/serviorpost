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
exports.store = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = require("../config");
const dummy_schema_1 = require("./dummy.schema");
const connectInfo = {
    host: config_1.config.mySql.host,
    user: config_1.config.mySql.user,
    database: config_1.config.mySql.database,
    password: config_1.config.mySql.password,
};
function list(table) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`SELECT u.id , u.name FROM ${table} as u `);
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        connection.end();
        return dataBase || ["no hay datos"];
    });
}
// info de user  
function get(table, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`SELECT * FROM ${table} WHERE id = ${id} `);
            // results contains rows returned by server
            const getDAta = db;
            const _a = getDAta[0], { password } = _a, userData = __rest(_a, ["password"]);
            //create a list for followers
            userData.followers = yield viewFollowers(table, id);
            userData.youFollow = yield viewFollow(table, id);
            userData.viewPostLike = yield viewPostLike(dummy_schema_1.TABLA.USER, dummy_schema_1.TABLA.POST, id);
            dataBase = userData;
        }
        catch (err) {
            console.log(err);
        }
        connection.end();
        return dataBase;
    });
}
//create user
function insert(table, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`INSERT INTO ${table} SET ? `, data);
            // results contains rows returned by server
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        connection.end();
        return dataBase;
    });
}
//update user info
function upset(table, data, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return id ? update(table, data, id) : insert(table, data);
    });
}
function query(table, q) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = Object.keys(q)[0];
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`SELECT * FROM ${table} WHERE ${key} = '${q[key]}' `);
            // results contains rows returned by server
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        connection.end();
        return dataBase;
    });
}
function update(table, data, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            // delete data.id
            const [db, fields] = yield connection.query(`UPDATE ${table} SET ?  WHERE id = ${id}`, data);
            // results contains rows returned by server
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        return dataBase;
    });
}
function follow(table, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            // delete data.id
            const [db, fields] = yield connection.query(`INSERT INTO ${table} SET ? `, data);
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        return dataBase;
    });
}
function viewFollowers(table, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`SELECT u.id , u.name  FROM ${table} AS u INNER JOIN ${table}_follow  as FollowList ON u.id = FollowList.follower_id WHERE  FollowList.follower_id = ${id} `);
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        return dataBase;
    });
}
function viewFollow(table, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`SELECT u.id , u.name  FROM ${table} AS u INNER JOIN ${table}_follow  as FollowList ON u.id = FollowList.follower_id WHERE  FollowList.user_id = ${id} `);
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        return dataBase;
    });
}
function viewPostLike(tablaUser, tablaPost, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`SELECT u.id , u.name  FROM ${tablaUser} AS u INNER JOIN ${tablaPost}_like as postList ON u.id = postList.user_id WHERE  postList.post_id = ${id} `);
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        return dataBase;
    });
}
//* Post
function listPost(table) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`SELECT * FROM ${table} as u `);
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        connection.end();
        return dataBase || ["no hay datos"];
    });
}
function getPost(table, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`SELECT * FROM ${table} WHERE id = ${id} `);
            // results contains rows returned by server
            const getDAta = db;
            const _a = getDAta[0], { password } = _a, userData = __rest(_a, ["password"]);
            //create a list for followers
            userData.userThatLike = yield viewUserLiked(table, dummy_schema_1.TABLA.USER, id);
            // userData.youFollow = await viewFollow(table,id)
            dataBase = userData;
        }
        catch (err) {
            console.log(err);
        }
        connection.end();
        return dataBase;
    });
}
function updatePost(table, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`UPDATE ${table} SET ?  WHERE id = ${data.idPost} AND owner_id = ${data.user}`, data.data);
            // results contains rows returned by server
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        return dataBase;
    });
}
function viewUserLiked(table, userTabla, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`SELECT u.id , u.name  FROM ${userTabla} AS u INNER JOIN ${table}_like as LikeList ON u.id = LikeList.user_id WHERE  LikeList.post_id = ${id} `);
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        return dataBase;
    });
}
function deletePost(table, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(connectInfo);
        let dataBase;
        try {
            const [db, fields] = yield connection.query(`DELETE FROM ${table} as P WHERE p.id = ${data.postID} AND p.owner_id = ${data.userID};`);
            // results contains rows returned by server
            dataBase = db;
        }
        catch (err) {
            console.log(err);
        }
        return dataBase;
    });
}
exports.store = {
    list,
    get,
    upset,
    follow,
    update,
    query,
    listPost,
    getPost,
    updatePost,
    deletePost
};
