import mysql from "mysql2/promise";
import { TABLA } from "./dummy.schema";
declare function list(table: TABLA): Promise<mysql.OkPacket | mysql.ResultSetHeader | mysql.RowDataPacket[] | [mysql.RowDataPacket[], mysql.ResultSetHeader] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ResultSetHeader[] | [string]>;
declare function get(table: TABLA, id: string): Promise<any>;
declare function upset(table: TABLA, data: any, id: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket | mysql.ResultSetHeader[] | undefined>;
declare function query(table: TABLA, q: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket | mysql.ResultSetHeader[] | undefined>;
declare function update(table: TABLA, data: any, id: number): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket | mysql.ResultSetHeader[] | undefined>;
declare function follow(table: TABLA, data: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket | mysql.ResultSetHeader[] | undefined>;
declare function getPost(table: TABLA, id: string): Promise<any>;
declare function updatePost(table: TABLA, data: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket | mysql.ResultSetHeader[] | undefined>;
export declare const store: {
    list: typeof list;
    get: typeof get;
    upset: typeof upset;
    follow: typeof follow;
    update: typeof update;
    query: typeof query;
    getPost: typeof getPost;
    updatePost: typeof updatePost;
};
export {};
