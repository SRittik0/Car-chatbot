import express from "express";
import { createCar, getAllCars } from "../controllers/cars.controller.js";

const router = express.Router();

// Update Data
// Create Listing

router.post("/createCar", createCar);
router.get("/allcars", getAllCars);

export default router;
