import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const sendBadRequestResponse = (res) => {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: false, message: ReasonPhrases.BAD_REQUEST });
};
