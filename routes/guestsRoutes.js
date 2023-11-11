import express from "express";
import {
  createGuest,
  deleteGuest,
  getAllGuests,
  getGuest,
  updateGuest,
} from "../controllers/guests.js";

const router = express.Router();

router.get("/guests", getAllGuests);
router.get("/guest/:guestId", getGuest);
router.post("/guest", createGuest);
router.delete("/guest/:guestId", deleteGuest);
router.put("/guest/:guestId", updateGuest);

export { router };
