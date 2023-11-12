import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  currentUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user", getSingleUser);
router.get("/user/current-user", currentUser);
router.patch("/user", updateUser);
router.delete("/user", deleteUser);

export { router };
