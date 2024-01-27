export declare enum TABLA {
    USER = "user",
    AUTH = "auth",
    POST = "post"
}
export interface TypeDataBase {
    user: TypeData[];
    auth?: TypeAuth[];
    post?: any;
}
export type TypeData = {
    name: string;
    userName?: string;
    id: string;
    password: string;
};
export type TypeAuth = {
    name?: string;
    id: string;
    password?: string;
    userName?: string;
};
export type TypePost = {
    title: string;
    detail: string;
    owner_id: string;
    id?: number;
};
export interface AllTypeDataBase {
    db: TypeDataBase;
    list: (table: TABLA) => {};
    get: (table: TABLA, id: number) => {};
    upset: (table: TABLA, data: any) => {};
    remove: () => {
        table: string;
        id: number;
    };
}
export type ACTIONS = 'update' | 'follow';
