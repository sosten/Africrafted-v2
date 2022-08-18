import express from "express";
import productController from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.route('/product')
    .get(productController.getProduct)
    .post(productController.createProduct)
productRouter.route('/product/:id')
    .delete(productController.deleteProduct)
    .put(productController.updateProduct)

export default productRouter;