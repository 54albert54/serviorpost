import { Request } from 'express';
declare function sign(data: string): string;
export declare function decodeHeader(req: Request): any;
export declare const auth: {
    sign: typeof sign;
    check: {
        own: (req: Request, owner: any) => void;
        follow: (req: Request) => any;
    };
};
export {};
