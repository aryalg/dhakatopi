import express from "express";

const router = express.Router();

// We'll have list of user routes

// Sample Code to Understand Middleware and Error Handling

// User (frontend) request => req -> (MW - next()) -> (MW - next()) -> (MW - next()) -> res (Request Response Cycle Complete)

const consoleMiddleware = (req, res, next) => {
  console.log("This is from console middleware");
  next();
};

const consoleMiddleware2 = (req, res, next) => {
  console.log("This is from console middleware2");
  throw new Error();
  next();
};

const hamroAafnaiErrorMiddleware = (err, req, res, next) => {
  res.send("Error Occured");
};

router.get(
  "/login",
  consoleMiddleware,
  consoleMiddleware2,
  hamroAafnaiErrorMiddleware,
  (req, res) => {
    res.send({
      message: "Login Successfully",
    });
  }
);

export default router;
