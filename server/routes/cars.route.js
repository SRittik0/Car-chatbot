import express from "express";
import { createCar, getAllCars } from "../controllers/cars.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Update Data
// Create Listing

router.post("/create", verifyToken, createCar);
router.get("/allcars", getAllCars);

export default router;
