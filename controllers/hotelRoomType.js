import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { HotelRoomType } from "../models/hotelRoomType.js";
import { sendBadRequestResponse } from "../utils/sendBadRequestResponse.js";

export const createHotelRoomType = async (req, res) => {
  const { typeName } = req.body;
  if (!typeName.trim()) {
    return sendBadRequestResponse(res);
  }

  const newHotelRoomType = await HotelRoomType.create({ typeName });
  return res.status(StatusCodes.OK).json({
    success: true,
    message: ReasonPhrases.CREATED,
    data: newHotelRoomType,
  });
};

export const getAllHotelRoomTypes = async (req, res) => {
  const allHotelRoomTypes = await HotelRoomType.find({});
  return res.status(StatusCodes.OK).json({
    success: true,
    message: ReasonPhrases.OK,
    data: allHotelRoomTypes,
  });
};

export const updatedHotelRoomType = async (req, res) => {
  const { hotelRoomTypeID, typeName } = req.body;

  if (!hotelRoomTypeID || !typeName.trim()) {
    return sendBadRequestResponse(res);
  }

  const updatedHotelRoomType = await HotelRoomType.findOneAndUpdate(
    {
      _id: hotelRoomTypeID,
    },
    { typeName },
    { new: true }
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: ReasonPhrases.OK,
    data: updatedHotelRoomType,
  });
};

export const deleteHotelRoomType = async (req, res) => {
  const { hotelRoomTypeID } = req.body;
  if (!hotelRoomTypeID) {
    return sendBadRequestResponse(res);
  }

  const deleteHotelRoomType = await HotelRoomType.findOneAndDelete({
    _id: hotelRoomTypeID,
  });

  return res
    .status(StatusCodes.OK)
    .json({
      success: true,
      message: ReasonPhrases.OK,
      data: deleteHotelRoomType,
    });
};
