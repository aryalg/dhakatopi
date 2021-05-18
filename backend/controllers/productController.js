import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch All Products
// @routes  GET /api/products
// @access  public

const getProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({});

  res.json(products);
});

// @desc    Fetch product by ID
// @routes  GET /api/products/:id
// @access  public

const getProductById = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProducts, getProductById };
