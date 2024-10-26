import { Router } from "express";
import { getProducts, createProduct } from "../controllers/productController";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post("/create-product", createProduct);

export default productRouter;