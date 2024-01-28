import { TABLA, TypePost } from "../../store/dummy.schema";
export declare const controller: (TABLA: TABLA, injectedStored: any) => {
    list: () => Promise<any>;
    upset: (post: TypePost) => Promise<void>;
    get: (id: string) => Promise<any>;
    updatePost: (data: any, idPost: string, user: number) => Promise<void>;
    follow: (from: string, to: string) => Promise<void>;
    deleted: (postID: string, userID: string) => Promise<void>;
};
