import mongoose from "mongoose";
import bscrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bscrypt.compare(enteredPassword, this.password);
};

// createdAt
// updatedAt

const User = mongoose.model("User", userSchema);

export default User;
