export const attachCookie = ({
  cookieName = "jwtToken",
  token,
  expires = 0,
  res,
}) => {
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + expires),
  });
};
