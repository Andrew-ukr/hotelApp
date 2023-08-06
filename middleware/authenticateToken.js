import jwt from "jsonwebtoken";
import { cookieTokenName } from "../utils/constants.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies[cookieTokenName];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: `${ReasonPhrases.UNAUTHORIZED} - Token is missing`,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: `${ReasonPhrases.UNAUTHORIZED} - Token is invalid` });
    }
    console.log({ decoded });
    req.user = decoded;
    next();
  });
};
