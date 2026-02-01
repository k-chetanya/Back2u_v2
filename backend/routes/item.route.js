import express from "express";
import { createItem } from "../controllers/item.controller.js";
import { upload } from "../middlewares/multer.js";
import { getItems } from "../controllers/item.controller.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";
import { getItemById } from "../controllers/item.controller.js";
import { resolveItem ,updateItem,getMyItems,getDashboardStats} from "../controllers/item.controller.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  upload.single("image"),
  createItem
);

router.get("/", getItems);
router.get("/my-items", isAuthenticated, getMyItems);
router.get("/dashboard/stats", isAuthenticated, getDashboardStats);
router.get("/:id", getItemById);
router.patch("/resolve/:id", isAuthenticated, resolveItem);
router.put("/:id", isAuthenticated, updateItem);


export default router;
