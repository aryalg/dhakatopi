import express from "express";

import Product from "../models/productModel.js";

const router = express.Router();

import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

router.get("/", getProducts);

router.get("/:id", getProductById);

export default router;
