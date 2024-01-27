import express, { Request, Response } from "express";
import { estatusSuccess, estatusError } from "../../network/response";

import  controller  from "./index";



const routerAuth = express.Router();

routerAuth.post("/login", async (req: Request, res: Response) => {
  const { userName , password} = req.body;
  

  

  
  controller()
    .query(userName,password)
    .then((datos) =>{      
      estatusSuccess({ req, res, message: datos })})
    .catch((error) => estatusError({ req, res, message: 'error catch password '+error }));

  });





export { routerAuth };


