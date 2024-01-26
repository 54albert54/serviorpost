import { TABLA, TypeAuth } from "../../store/dummy.schema";
export interface TProps {
    userName: string;
    password: string;
}
export declare const controller: (TABLA: TABLA, injectedStored: any) => {
    upset: (data: TypeAuth) => Promise<void>;
    query: (userName: string, password: string) => Promise<string>;
};
