import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

// Update Data
// Create Listing

router.get("/test", test);

export default router;
