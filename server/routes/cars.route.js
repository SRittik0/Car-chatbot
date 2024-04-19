import express from "express";
import {
  createCar,
  getAllCars,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/cars.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Update Data
// Create Listing

router.post("/create", verifyToken, createCar);
router.get("/allcars", getAllCars);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
