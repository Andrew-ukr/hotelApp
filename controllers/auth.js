import { User } from "../models/userModel.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  attachCookie,
  createToken,
  sendBadRequestResponse,
} from "../utils/index.js";
import { oneDay } from "../utils/constants.js";
import { use } from "bcrypt/promises.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const isEmailAlreadyExists = await User.findOne({ email });

  if (isEmailAlreadyExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `A user with the email ${email} already exists`,
    });
  }

  const user = await User.create({ name, email, password, role });
  const token = createToken({ user: { userId: user._id, name, email, role } }); // maybe not all these fields are needed

  attachCookie({
    token,
    expires: oneDay,
    res,
  });

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: ReasonPhrases.CREATED,
    user: { id: user._id, name: user.name, email: user.email },
  });
};

export const login = async (req, res) => {
  const { name, password, email } = req.body;

  const user = await User.findOne({ email, name });
  const isPassword = user && (await user.comparePasswords(password));

  if (user && isPassword) {
    const token = createToken({ user: { userId: user._id, name, email } });
    attachCookie({ res, token, expires: oneDay });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      user: { id: user._id, name: use.name, email: user.email },
    });
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Invalid user credentials. ${ReasonPhrases.BAD_REQUEST}`,
    });
  }
};

export const logout = async (req, res) => {
  attachCookie({
    token: "logout",
    res,
  });

  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: ReasonPhrases.UNAUTHORIZED });
};


