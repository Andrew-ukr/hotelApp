import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const notFoundMiddleware = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
};
