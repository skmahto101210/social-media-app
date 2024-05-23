import express from "express";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from "../controllers/users.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/:friendId", verifyToken, getUserFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
