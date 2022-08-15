import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.get('/refresh_token', userController.refreshToken);
userRouter.get('/infor', auth, userController.getUser);

export default userRouter;