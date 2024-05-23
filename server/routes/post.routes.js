import express from "express";
import { upload } from "../util/multer.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

// ROUTES WITH FILES
router.post("/", verifyToken, upload.single("picture"), createPost);
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);

export default router;
