import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct} from "../controllers/product.controller.js";

const router = express.Router();    // lets us use routes

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;