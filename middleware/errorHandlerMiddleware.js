import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err._message === "User validation failed") {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `User validation failed: ${Object.values(err.errors)
        .map((error) => error.message)
        .join(", ")}`,
    });
  }
  
  if (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};
