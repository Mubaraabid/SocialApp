import { Router } from "express";
import PostController from "../controller/posts.js";
import postvalidator from "../validator/postsvalidation.js";
 
const postRouter = new Router();
postRouter.post("/create",postvalidator.create, PostController.create);
postRouter.post("/updatepost/:id",postvalidator.update, PostController.update);
postRouter.get("/deletepost/:id",PostController.delete);
postRouter.get("/likes/:id",PostController.like);
postRouter.get("/share/:id",PostController.share);
postRouter.get("/dislikes/:id",PostController.dislike);
postRouter.get("/getAllposts", PostController.getAll);
postRouter.get("/singlepost/:id", PostController.getSingle);
postRouter.post("/getuserposts",PostController.getuserpost);
postRouter.get("/latestpost",PostController.latestpost);
postRouter.post("/emailpost",PostController.emailpost);

export default postRouter;
