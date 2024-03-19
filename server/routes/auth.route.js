import express from "express";
import {
  google,
  signOut,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

//login
// Signup
router.post("/signup", signup);

router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);

export default router;
