import mongoose from "mongoose";

const hotelRoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HotelRoomType',
    required: true,
  },
  occupancy: {
    type: Number,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  amenities: [String],
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const HotelRoom = mongoose.model("HotelRoom", hotelRoomSchema);

export { HotelRoom };
