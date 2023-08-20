import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user", getSingleUser);
router.patch("/user", updateUser);
router.delete("/user", deleteUser);

export { router };
