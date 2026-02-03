import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

router.route("/")
  .post(createProduct)
  .get(getProducts);

router.route("/:id")
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
