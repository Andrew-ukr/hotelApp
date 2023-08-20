import { Router } from "express";
import {
  createHotelRoomType,
  deleteHotelRoomType,
  getAllHotelRoomTypes,
  updatedHotelRoomType,
} from "../controllers/hotelRoomType.js";

const router = Router();

router.get("/", getAllHotelRoomTypes);
router.post("/", createHotelRoomType);
router.delete("/", deleteHotelRoomType);
router.put("/", updatedHotelRoomType);

export { router };
