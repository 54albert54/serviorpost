import { TABLA, TypeData } from "../../store/dummy.schema";
export declare const controller: (TABLA: TABLA, injectedStored: any) => {
    list: () => Promise<any>;
    get: (name: string) => Promise<any>;
    upset: (data: TypeData) => Promise<{
        name: string;
        userName?: string | undefined;
        id: string;
    }>;
    remove: (id: string) => Promise<void>;
    update: (body: any) => Promise<void>;
    follow: (from: string, to: string) => Promise<void>;
};
