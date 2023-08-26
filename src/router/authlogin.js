import { Router } from "express";
import AuthController from "../controller/authlogin.js";

const authRouter = new Router();
authRouter.post("/authlogin", AuthController.login);

export default authRouter;
