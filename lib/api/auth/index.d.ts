declare const _default: () => {
    upset: (data: import("../../store/dummy.schema").TypeAuth) => Promise<void>;
    query: (userName: string, password: string) => Promise<{
        showData: any;
        token: string;
    }>;
    update: (data: any) => Promise<void>;
};
export default _default;
