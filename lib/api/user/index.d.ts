declare const _default: (store: any) => {
    list: () => Promise<any>;
    get: (name: string) => Promise<any>;
    upset: (data: import("../../store/dummy.schema").TypeData) => Promise<void>;
    remove: (id: string) => Promise<void>;
};
export default _default;
