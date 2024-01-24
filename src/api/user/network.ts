import express, { Request, Response } from "express";
import { estatusSuccess, estatusError } from "../../network/response";

import  controller  from "./index";
import { store } from "../../store/dummyDataBase";


const routerUser = express.Router();

routerUser.get("/", async (req: Request, res: Response) => {
  controller(store)
    .list()
    .then((list) => estatusSuccess({ req, res, message: list }))
    .catch((error) => estatusError({ req, res, message: "error "+error  }));
});
routerUser.get("/:name", async (req: Request, res: Response) => {

  
  controller(store)
    .get(req.params.name)
    .then((user) => estatusSuccess({ req, res, message: user }))
    .catch((error) => estatusError({ req, res, message: "error "+error }));
});
// crear un usuario nuevo
routerUser.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  controller(store)
    .upset(body)
    .then((user) => estatusSuccess({ req, res, message: "new user add "+ user }))
    .catch((error) => estatusError({ req, res, message: "error "+error }));
});
routerUser.delete("/:name", async (req: Request, res: Response) => {
  controller(store)
    .remove(req.params.name)
    .then((user) => estatusSuccess({ req, res, message: user }))
    .catch((error) => estatusError({ req, res, message: "error "+error  }));
});


export { routerUser };


