import catchAsync from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// We will create a middleware -> which will check if user has sent a token, it is not expired and it is valid.

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // User has sent a token

    try {
      token = req.headers.authorization.split(" ")[1];

      console.log(req.headers.authorization);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not Authorized! Token Failed");
    }
  }
});
