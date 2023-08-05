import { User } from "../models/userModel.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  const token = jwt.sign({ name, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  
  res.cookie("jwtToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 3600000),
  });

  return res.status(StatusCodes.OK).json({ success: true, user, token });
};

export const login = async (req, res) => {
  const { name, password, email } = req.body;

  const user = await User.findOne({ email, name });
  const isPassword = user && (await user.comparePasswords(password));


  if (user && isPassword) {
    return res.status(200).json("login user");
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: ReasonPhrases.UNAUTHORIZED });
  }
};

export const logout = (req, res) => {
  return res.status(200).json("logout user");
};
