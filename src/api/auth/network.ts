import express, { Request, Response } from "express";
import { estatusSuccess, estatusError } from "../../network/response";

import  controller  from "./index";
import { store } from "../../store/dummyDataBase";


const routerAuth = express.Router();

routerAuth.post("/login", async (req: Request, res: Response) => {
  const { userName , passwords} = req.body
  
  
  controller(store)
    .query(userName,passwords)
    .then((datos) => estatusSuccess({ req, res, message: datos }))
    .catch((error) => estatusError({ req, res, message: 'error catch password '+error }));

  });

// routerUser.get("/:name", async (req: Request, res: Response) => {

  
//   controller(store)
//     .get(req.params.name)
//     .then((user) => estatusSuccess({ req, res, message: user }))
//     .catch((error) => estatusError({ req, res, message: "error " }));
// });
// // crear un usuario nuevo
// routerUser.post("/", async (req: Request, res: Response) => {
//   const body = req.body;

//   controller(store)
//     .upset(body)
//     .then((user) => estatusSuccess({ req, res, message: "new user add" }))
//     .catch((error) => estatusError({ req, res, message: "error " }));
// });
// routerUser.delete("/:name", async (req: Request, res: Response) => {
//   controller(store)
//     .remove(req.params.name)
//     .then((user) => estatusSuccess({ req, res, message: user }))
//     .catch((error) => estatusError({ req, res, message: "error " }));
// });


export { routerAuth };


