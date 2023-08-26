import { Router } from "express";
import UserController from "../controller/user.js";
import uservalidator from "../validator/uservalidation.js";
import OTPController from '../controller/otp.js'; 
import pathAuthenticated from "../middleware/authMiddleware.js";
import { RoleCheck } from "../middleware/roleCheck.middleware.js";
import { EUserRole } from "../enums/role.js";

const userRouter = new Router();
userRouter.post('/sendotp', OTPController.sendotp);
userRouter.post("/signup",uservalidator.signup, UserController.signup);
userRouter.put("/update/:id",pathAuthenticated,uservalidator.update, UserController.update);
userRouter.get("/delete/:id",pathAuthenticated,UserController.delete);
userRouter.get("/singleuser/:id",pathAuthenticated,UserController.getSingle);
userRouter.post("/getAllUser",pathAuthenticated,RoleCheck([EUserRole.admin]), UserController.getAlluser);
userRouter.get("/getall",pathAuthenticated,RoleCheck([EUserRole.admin]), UserController.getAll);

export default userRouter;
