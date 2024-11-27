import express from "express";
import {
  listBusCtrl,
  createBusCtrl,
  updateBusCtrl,
  deleteBusCtrl,
} from "../controllers/busCtrl.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET || ALL Bus lists
router.get("/buses", authenticate, authorize(["user", "admin"]), listBusCtrl);

// CREATE || Single Bus
router.post("/admin/bus", authenticate, authorize(["admin"]), createBusCtrl);

// UPDATE || Update Bus Info
router.put("/admin/bus/:id", authenticate, authorize(["admin"]), updateBusCtrl);

// DELETE || Delete Bus
router.delete(
  "/admin/bus/:id",
  authenticate,
  authorize(["admin"]),
  deleteBusCtrl
);

export default router;
