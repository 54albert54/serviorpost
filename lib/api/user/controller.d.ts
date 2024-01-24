import { TABLA, TypeData } from "../../store/dummy.schema";
export declare const controller: (TABLA: TABLA, injectedStored: any) => {
    list: () => Promise<any>;
    get: (name: string) => Promise<any>;
    upset: (data: TypeData) => Promise<void>;
    remove: (id: string) => Promise<void>;
};
