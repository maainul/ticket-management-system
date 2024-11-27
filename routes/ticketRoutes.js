import express from "express";
import {
  listTicketCtrl,
  createTicketCtrl,
  updateTicketCtrl,
  deleteTicketCtrl,
  purchaseTicketCtrl,
} from "../controllers/ticketCtrl.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET || ALL Ticket lists
// PUBLIC ROUTE
router.get("/tickets", listTicketCtrl);

// CREATE || Single Ticket
router.post(
  "/admin/ticket",
  authenticate,
  authorize(["admin"]),
  createTicketCtrl
);

// UPDATE || Update Ticket Info
router.put(
  "/admin/ticket/:id",
  authenticate,
  authorize(["admin"]),
  updateTicketCtrl
);

// DELETE || Delete Ticket
router.delete(
  "/admin/ticket/:id",
  authenticate,
  authorize(["admin"]),
  deleteTicketCtrl
);

router.post(
  "/tickets/purchase",
  authenticate,
  authorize(["user", "admin"]),
  purchaseTicketCtrl
);

export default router;
