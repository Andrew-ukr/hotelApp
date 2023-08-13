import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../models/userModel.js";

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}, "-password");
  console.log(allUsers);
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

const updateUser = (req, res) => {
  res.status(StatusCodes.OK).json({ success: true, message: ReasonPhrases.OK });
};

const deleteUser = async (req, res) => {
  const { userId } = req.body;

  if (userId) {
    const deleteUser = await User().deleteOne({ _id: userId });
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
