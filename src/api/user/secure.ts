import { Request, Response } from "express";
import { auth } from "../../auth";
import { ACTIONS } from "../../store/dummy.schema";
export const checkAuth = (action: ACTIONS) => {
  // 
  const middleware = (req: Request, res: Response, next: any) => {
    switch (action) {
      case "update":
        const owner = req.body.id;
        auth.check.own(req, owner);
        next();
        break;
      case "follow":
        const dataFollow = auth.check.follow(req)
        if (dataFollow){
          next();
        }
        break;
      case "delete":
        const dataDelete =  auth.check.follow(req)
        if (dataDelete){
        next();
      }
        
        break;

      default:
        next();
        break;
    }
  };

  return middleware;
};
