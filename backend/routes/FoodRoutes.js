import express from "express";
import {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
  dashboard,
} from "../controllers/FoodController.js";

const router = express.Router();

router.post("/", addFood);
router.get("/", getFoods);
router.get("/dashboard", dashboard);
router.get("/:id", getFoodById);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;