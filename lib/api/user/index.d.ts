declare const _default: () => {
    list: () => Promise<any>;
    get: (name: string) => Promise<any>;
    upset: (data: import("../../store/dummy.schema").TypeData) => Promise<{
        name: string;
        userName?: string | undefined;
        id: string;
    }>;
    remove: (id: string) => Promise<void>;
    update: (body: any) => Promise<void>;
    follow: (from: string, to: string) => Promise<void>;
};
export default _default;
