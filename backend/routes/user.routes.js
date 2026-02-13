import { Router } from "express";
import { multerMiddleware } from "../middleware/multer.middleware.js";
import {registerUser,loginUser} from "../controllers/user.controller.js"

const userRouter = Router();
userRouter.post('/register',multerMiddleware,registerUser)
userRouter.post('/login',multerMiddleware,loginUser)
export  {userRouter}