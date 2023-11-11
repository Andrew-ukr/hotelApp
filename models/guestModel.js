import mongoose from "mongoose";
import validator from "validator";

const guestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "user name field is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "user phone field is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      // unique: true,
      // lowercase: true,
      // trim: true,
      // validate: {
      //   validator: (v) => validator.isEmail(v),
      //   message: "please enter a valid email address",
      // },
    },
    passportNumber: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    notice: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", guestSchema);

export { Guest };
