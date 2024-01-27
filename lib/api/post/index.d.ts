declare const _default: () => {
    list: () => Promise<any>;
    upset: (post: import("../../store/dummy.schema").TypePost) => Promise<void>;
    get: (id: string) => Promise<any>;
    updatePost: (data: any, idPost: string, user: number) => Promise<void>;
    follow: (from: string, to: string) => Promise<void>;
};
export default _default;
