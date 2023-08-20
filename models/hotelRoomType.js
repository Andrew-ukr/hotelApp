import mongoose from "mongoose";

const hotelRoomTypeSchema = new mongoose.Schema(
  {
    typeName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const HotelRoomType = mongoose.model("HotelRoomType", hotelRoomTypeSchema);

export { HotelRoomType };
