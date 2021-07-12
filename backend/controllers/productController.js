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
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  let products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // 99 pageSize - 10  (99/10 = 9.9 (10 after ceiling))

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
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

// @desc    Fetch Top Products
// @routes  GET /api/products/top
// @access  public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export { getProducts, getProductById, getTopProducts };
