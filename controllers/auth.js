import { User } from "../models/userModel.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  return res.status(StatusCodes.OK).json({ success: true, user });
};

export const login = async (req, res) => {
  const { name, password, email } = req.body;

  const user = await User.findOne({ email, name });
  const isPassword = user && await user.comparePasswords(password)

  if (user && isPassword) {
    return res.status(200).json("login user");
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: ReasonPhrases.UNAUTHORIZED });
  }
};

export const logout = (req, res) => {
  return res.status(200).json("logout user");
};
