import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.get('/refresh_token', userController.refreshToken);

export default userRouter;