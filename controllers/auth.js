import { User } from "../models/userModel.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { attachCookie, createToken } from "../utils/index.js";
import { oneDay } from "../utils/constants.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  const token = createToken({ user: { name, email } });

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
    const token = createToken({ user: { name, email } });
    attachCookie({ res, token, expires: oneDay });

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: ReasonPhrases.OK });
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: ReasonPhrases.UNAUTHORIZED });
  }
};

export const logout = (req, res) => {
  attachCookie({
    token: "logout",
    res,
  });

  return res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
};
