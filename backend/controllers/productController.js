import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch All Products
// @routes  GET /api/products
// @access  public

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const getProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({});

  let shuffleProducts = shuffle(products);

  res.json(shuffleProducts);
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
