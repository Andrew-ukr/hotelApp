import jwt from "jsonwebtoken";

export const createToken = ({user, expiresIn = '1d'}) => jwt.sign(user, process.env.JWT_SECRET, {
  expiresIn,
});
