import express from "express";

import Product from "../models/productModel.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

import {
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

import {
  getProducts,
  getProductById,
  getTopProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
