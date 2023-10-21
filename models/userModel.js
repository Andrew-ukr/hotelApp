import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { minPasswordLength } from "../utils/constants.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name field is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email field is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "password field is required"],
      minlength: [
        minPasswordLength,
        `password should contain at least ${minPasswordLength} characters`,
      ],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePasswords = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

export { User };
