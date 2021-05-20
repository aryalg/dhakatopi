// const express = require("express");
// const products = require("./data/products");
// const cors = require("cors");

// const dotenv = require("dotenv");

import express from "express";
import products from "./data/products.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res, next) => {
  res.send("API server is working");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));
