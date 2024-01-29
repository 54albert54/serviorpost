import express, { Request, Response } from "express";
import { estatusSuccess, estatusError } from "../../network/response";

import controller from "./index";

import { checkAuth } from "./secure";
import { decodeHeader } from "../../auth";

const routerUser = express.Router();

routerUser.get("/", async (req: Request, res: Response) => {
  controller()
    .list()
    .then((list) => estatusSuccess({ req, res, message: list }))
    .catch((error) => estatusError({ req, res, message: "error " + error }));
});
routerUser.get("/:id", async (req: Request, res: Response) => {
  controller()
    .get(req.params.id)
    .then((user) => estatusSuccess({ req, res, message: user }))
    .catch((error) => estatusError({ req, res, message: "error " + error }));
});
// crear un usuario nuevo
routerUser.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  if (body.password == body.secondPassword){
    const {secondPassword , ...goodData} =  body
     controller()
    .upset(goodData)
    .then((user) =>
      estatusSuccess({ req, res, message: { title: "new user added "} })
    )
    .catch((error) => estatusError({ req, res, message: "error " + error }));
  }else{
    estatusError({res,message:'the passwords need be the equals'})
 
}
  


});

// editar ya un usuario desde que este login
routerUser.put("/",
  //middleware
  checkAuth("update"),
  async (req: Request, res: Response) => {
    const body = req.body;

    controller()
      .update(body)
      .then((user) =>
        estatusSuccess({ req, res, message: "update user info" + user })
      )
      .catch((error) => estatusError({ req, res, message: "error " + error }));
  }
);

// seguir un usuario
routerUser.post(  "/follow/:id",
  //middleware
  checkAuth("follow"),
  async (req: Request, res: Response) => {
    const data = decodeHeader(req);

    controller()
      .follow(data.id, req.params?.id)
      .then((user) =>
        estatusSuccess({ req, res, message: "update user info" + user })
      )
      .catch((error) => estatusError({ req, res, message: "error " + error }));
  }
);

routerUser.delete("/:name", async (req: Request, res: Response) => {
  controller()
    .remove(req.params.name)
    .then((user) => estatusSuccess({ req, res, message: user }))
    .catch((error) => estatusError({ req, res, message: "error " + error }));
});

export { routerUser };
