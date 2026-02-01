import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import {
  getMe,
  updateProfile,
  updatePassword,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { uploadAvatar } from "../middlewares/multer.js";

const router = express.Router()

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.get("/me", isAuthenticated, getMe);
router.put(
  "/profile",
  isAuthenticated,
  uploadAvatar.single("avatar"),
  updateProfile
);

router.put(
  "/update-password",
  isAuthenticated,
  updatePassword
);

export default router 