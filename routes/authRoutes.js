import express from "express";
import {
  loginUserCtrl,
  logoutUserCtrl,
  registerUserCtrl,
} from "../controllers/authCtrl.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST
router.post("/register", registerUserCtrl);
router.post("/login", loginUserCtrl);
router.post("/logout", logoutUserCtrl);

export default router;
