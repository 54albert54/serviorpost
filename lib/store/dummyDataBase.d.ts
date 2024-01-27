import { TABLA, TypeDataBase } from "./dummy.schema";
declare function list(table: TABLA): Promise<any>;
declare function get(table: TABLA, id: string): Promise<any>;
declare function upset(table: TABLA, data: any): Promise<any>;
declare function remove(table: TABLA, name: string): void;
declare function query(table: TABLA, q: any): Promise<any>;
export declare const store: {
    db: TypeDataBase;
    list: typeof list;
    get: typeof get;
    upset: typeof upset;
    remove: typeof remove;
    query: typeof query;
};
export {};
