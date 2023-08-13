import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../models/userModel.js";
import { minPasswordLength } from "../utils/constants.js";
import { attachCookie } from "../utils/attachCookie.js";

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}, "-password");
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: ReasonPhrases.OK, data: allUsers });
};

const getSingleUser = async (req, res) => {
  const { userId } = req.body;
  if (userId) {
    const singleUser = await User.findOne({ _id: userId }, "-password");
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: ReasonPhrases.OK, data: singleUser });
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: ReasonPhrases.BAD_REQUEST });
  }
};

const updateUser = async (req, res) => {
  const { userId, name, email, password } = req.body;

  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (email) updatedFields.email = email;

  if (password.length >= minPasswordLength && userId) {
    const user = await User.findOne({ _id: userId });
    user.password = password;
    await user.save();
    if (!Object.keys(updatedFields).length) {
      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: ReasonPhrases.OK });
    }
  }

  if (!Object.keys(updatedFields).length || !userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: ReasonPhrases.BAD_REQUEST });
  } else {
    const updates = await User.findByIdAndUpdate(
      { _id: userId },
      updatedFields,
      { new: true, runValidators: true }
    );

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: ReasonPhrases.OK, data: updates });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.body;

  if (userId) {
    const deleteUser = await User.findOneAndDelete({ _id: userId });
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: ReasonPhrases.OK, data: deleteUser });
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: ReasonPhrases.BAD_REQUEST });
  }
};

export { getAllUsers, getSingleUser, updateUser, deleteUser };
