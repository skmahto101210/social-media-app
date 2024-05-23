import express from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { upload } from "../util/multer.js";

const router = express.Router();

// ROUTES WITH FILES
router.post("/register", upload.single("picture"), register);
router.post("/login", login);

export default router;
