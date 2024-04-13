import express from "express";
import {
  createCar,
  getAllCars,
  deleteListing,
  updateListing,
} from "../controllers/cars.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Update Data
// Create Listing

router.post("/create", verifyToken, createCar);
router.get("/allcars", getAllCars);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);

export default router;
