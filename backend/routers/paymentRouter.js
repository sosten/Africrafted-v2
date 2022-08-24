import express from "express";
import paymentController from "../controllers/paymentController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

const paymentRouter = express.Router();

paymentRouter.route('/payment')
    .get(auth, authAdmin, paymentController.getPayments)
    .post(auth, paymentController.createPayment) 

export default paymentRouter;