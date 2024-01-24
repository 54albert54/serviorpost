declare const _default: (store: any) => {
    upset: (data: import("../../store/dummy.schema").TypeAuth) => Promise<void>;
    query: (userName: string, passwords: string) => Promise<string>;
};
export default _default;
