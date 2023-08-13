import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getSingleUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export { router };
