import mongoose from "mongoose";
import products from "../data/products";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    // 606dda21230ce54d2acc4f5c
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
