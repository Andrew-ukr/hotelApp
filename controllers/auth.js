import { User } from "../models/userModel.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { attachCookie } from "../utils/index.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  const token = jwt.sign({ name, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const oneDay = 1000 * 60 * 60 * 24;

  attachCookie({
    token,
    expires: oneDay,
    res,
  });

  return res.status(StatusCodes.OK).json({ success: true, user });
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
  res.cookie("jwtToken", "logout", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now()),
  });
  return res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
};
