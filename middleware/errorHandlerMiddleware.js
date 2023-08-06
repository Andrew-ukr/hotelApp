import { StatusCodes, ReasonPhrases } from "http-status-codes"

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  if (err) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}