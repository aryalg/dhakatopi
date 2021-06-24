import express from "express";

import { protect } from "../middlewares/authMiddleware.js";

import {
  addOrderItems,
  getOrderById,
  updateOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderById);

export default router;
