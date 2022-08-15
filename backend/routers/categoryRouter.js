import express from "express";
import categoryController from "../controllers/categoryController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

const categoryRouter = express.Router();

categoryRouter.route("/category")
    .get(categoryController.getCategory)
    .post(auth, authAdmin, categoryController.createCategory)
export default categoryRouter;