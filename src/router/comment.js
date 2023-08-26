import { Router } from "express";
import commentController from "../controller/comment.js";
import commentvalidator from "../validator/commentvalidation.js";

const commentRouter = new Router();
commentRouter.post("/commentcreate",commentvalidator.create, commentController.create);
commentRouter.post("/commentupdate/:id",commentvalidator.update, commentController.update);
commentRouter.get("/commentdelete/:id",commentController.delete);
commentRouter.get("/getallcomments", commentController.getAll);
commentRouter.get("/singlecomment/:id", commentController.getSingle);

export default commentRouter;