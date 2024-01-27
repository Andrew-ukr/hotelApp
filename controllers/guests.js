import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Guest } from "../models/guestModel.js";
import { sendBadRequestResponse } from "../utils/sendBadRequestResponse.js";

export const createGuest = async (req, res) => {
  const newGuest = await Guest.create({
    ...req.body,
    createdBy: req.user.userId,
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: ReasonPhrases.OK, guest: newGuest });
};

export const getAllGuests = async (req, res) => {
  const user = req.user.userId;

  const allGuests = await Guest.find({ createdBy: user });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: ReasonPhrases.OK, data: allGuests });
};

export const getGuest = async (req, res) => {
  const userId = req.user.userId;
  const guestId = req.params.guestId;

  const guest = await Guest.findOne({ createdBy: userId, _id: guestId });

  if (!guest) {
    return sendBadRequestResponse(res);
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: ReasonPhrases.OK, data: guest });
};

export const deleteGuest = async (req, res) => {
  const userId = req.user.userId;
  const guestId = req.params?.guestId || req.body?.guestId;

  if (guestId) {
    const deleteGuest = await Guest.findOneAndDelete({
      _id: guestId,
      createdBy: userId,
    });

    if (deleteGuest) {
      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: ReasonPhrases.OK });
    } else {
      return sendBadRequestResponse(res);
    }
  } else {
    return sendBadRequestResponse(res);
  }
};

export const updateGuest = async (req, res) => {
  const userId = req.user.userId;
  const guestId = req.params?.guestId;

  if (guestId) {
    const updateGuest = await Guest.findOneAndUpdate(
      {
        _id: guestId,
        createdBy: userId,
      },
      req.body,
      { new: true }
    );

    if (updateGuest) {
      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: ReasonPhrases.OK, data: updateGuest });
    } else {
      return sendBadRequestResponse(res);
    }
  } else {
    return sendBadRequestResponse(res);
  }
};
