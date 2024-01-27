import { Request, Response } from "express";
interface Props {
    res: Response;
    message: any;
    status?: number;
    req?: Request;
}
export declare const estatusSuccess: (props: Props) => void;
export declare const estatusError: (props: Props) => void;
export {};
