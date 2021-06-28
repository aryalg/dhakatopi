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

export const getUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User belonging to this token no longer exist");
  }
});

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  private
export const updateUserProfile = catchAsync(async (req, res) => {
  // Check if user exist on database
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User belonging to this token no longer exist");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  public

export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private access

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});
