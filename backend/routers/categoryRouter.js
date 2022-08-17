import express from "express";
import categoryController from "../controllers/categoryController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

const categoryRouter = express.Router();

categoryRouter.route("/category")
    .get(categoryController.getCategory)
    .post(auth, authAdmin, categoryController.createCategory)
categoryRouter.route("/category:id")
    .delete(auth, authAdmin, categoryController.deleteCategory)
    .put(auth, authAdmin, categoryController.updateCategory)

export default categoryRouter;