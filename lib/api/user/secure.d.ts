import { Request, Response } from "express";
import { ACTIONS } from "../../store/dummy.schema";
export declare const checkAuth: (action: ACTIONS) => (req: Request, res: Response, next: any) => void;
