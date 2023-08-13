import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../models/userModel.js";

const getAllUsers = async (req, res) => {
  console.log("getAllUsers");
  const allUsers = await User.find({}, '-password')
  console.log(allUsers)
  res.status(StatusCodes.OK).json({ success: true, message: ReasonPhrases.OK ,data: allUsers});
};

const getSingleUser = (req, res) => {
  console.log("getSingleUser");
  res.status(StatusCodes.OK).json({ success: true, message: ReasonPhrases.OK });
};

const updateUser = (req, res) => {
  console.log("updateUser");
  res.status(StatusCodes.OK).json({ success: true, message: ReasonPhrases.OK });
};

const deleteUser = (req, res) => {
  console.log("deleteUser");
  res.status(StatusCodes.OK).json({ success: true, message: ReasonPhrases.OK });
};

export {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
