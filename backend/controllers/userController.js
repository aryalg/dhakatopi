import User from "../models/userModel.js";
import catchAsync from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// We'll put all the logic to handle particular user related things here

// @desc      Auth User and Get Token
// @route     POST /api/users/login
// @access    public

export const authUser = catchAsync(async (req, res) => {
  // Parse data from req body
  const { email, password } = req.body;

  // Find user if it exist in database

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // User is valid -> Log him in
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    GET USER PROFILE
// @route   GET /api/users/profile
// @access  private

const getUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById();
});
