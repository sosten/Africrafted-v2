import express from "express";

productRouter = express.Router();

productRouter.route('/products')
    .get()
    .post()
productRouter.route('/product/:id')
    .delete()
    .put()

export default productRouter;