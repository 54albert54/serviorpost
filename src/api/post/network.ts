import express, { Request, Response } from "express";
import { estatusSuccess, estatusError } from "../../network/response";

import controller from "./index";
import { decodeHeader } from "../../auth";
import { checkAuth } from "../user/secure";

type TEditPost = {
  title?: string;
  detail?: string;
};

const routerPosts = express.Router();

routerPosts.get("/", async (req: Request, res: Response) => {
  controller()
    .list()
    .then((list) => estatusSuccess({ req, res, message: list }))
    .catch((error) => estatusError({ req, res, message: "error " + error }));
});
routerPosts.get("/:id", async (req: Request, res: Response) => {
  controller()
    .get(req.params.id)
    .then((list) => estatusSuccess({ req, res, message: list }))
    .catch((error) => estatusError({ req, res, message: "error " + error }));
});
// editar ya un post
routerPosts.put("/:id", async (req: Request, res: Response) => {
  const paramsId = req.params.id;
  const dataPost = req.body;

  // res.json({paramsId , dataPost})

  try {
    const user = decodeHeader(req) || "ss ";

    if (user.id === undefined) {
      res.json({ msj: "you need sing in before create a post" });
    } else {
      const dataPost: TEditPost = {};

      if (req.body.title) {
        dataPost.title = req.body.title;
      }
      if (req.body.detail) {
        dataPost.detail = req.body.detail;
      }

      controller()
        .updatePost(dataPost, paramsId, user.id)
        .then(() =>
          estatusSuccess({
            req,
            res,
            message: "you change the post successful " + paramsId+"  "+ user.id,
          })
        )
        .catch((error) =>
          estatusError({ req, res, message: "error " + error })
        );
    }
  } catch (error) {
    res.json({ msj: "you need sing in before create a post" });
  }
});

routerPosts.post("/", async (req: Request, res: Response) => {
  const post = req.body;

  try {
    const user = decodeHeader(req) || "ss ";

    if (user.id === undefined) {
      res.json({ msj: "you need sing in before create a post" });
    } else {
      const dataPost = {
        title: req.body.title,
        detail: req.body.detail,
        owner_id: user.id,
      };

      controller()
        .upset(dataPost)
        .then(() =>
          estatusSuccess({
            req,
            res,
            message: "se creo post del usuario " + dataPost.owner_id,
          })
        )
        .catch((error) =>
          estatusError({ req, res, message: "error " + error })
        );
    }
  } catch (error) {
    res.json({ msj: "you need sing in before create a post" });
  }
});

routerPosts.post("/like/:id", 
//middleware
checkAuth('follow'),
async (req: Request, res: Response) => {
  const data = decodeHeader(req)
  const postID = req.params.id

  controller()
    .follow(data.id,req.params?.id)
    .then((user) => estatusSuccess({ req, res, message: "le diste me gusta al post ID:"+ postID }))
    .catch((error) => estatusError({ req, res, message: "error "+error }));
});

routerPosts.delete("/:id", 
// //middleware
 checkAuth('delete'),

 async (req: Request, res: Response) => {
  const postId = req.params?.id
  const dataID = decodeHeader(req).id
 
  

  controller()
    .deleted(postId,dataID)
    .then((user) => estatusSuccess({ req, res, message: "Delete user info id "+ dataID }))
    .catch((error) => estatusError({ req, res, message: "error "+error }));
}
);

// updatePost

export { routerPosts };
