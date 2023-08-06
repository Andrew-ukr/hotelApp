import { cookieTokenName } from "./constants.js";

export const attachCookie = ({
  cookieName = cookieTokenName,
  token,
  expires = 0,
  res,
}) => {
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + expires),
    sign: true
  });
};
