import {
  createTicketService,
  deleteTicketService,
  listTicketService,
  updateTicketService,
  purchaseTicketService,
} from "../services/ticketService.js";
import { sendResponse } from "../utils/responseHelper.js";

export const listTicketCtrl = async (req, res, next) => {
  try {
    const ticketes = await listTicketService();
    sendResponse(res, 200, "Ticket list retrieved successfully", ticketes);
  } catch (error) {
    next(error);
  }
};

export const createTicketCtrl = async (req, res, next) => {
  try {
    const newTicket = await createTicketService(req.body);
    sendResponse(res, 201, "Ticket added successfully", newTicket);
  } catch (error) {
    next(error);
  }
};

export const updateTicketCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTicket = await updateTicketService(id, req.body);
    sendResponse(res, 200, "Ticket updated successfully", updatedTicket);
  } catch (error) {
    next(error);
  }
};

export const deleteTicketCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTicket = await deleteTicketService(id);
    sendResponse(res, 200, "Ticket deleted successfully", deletedTicket);
  } catch (error) {
    next(error);
  }
};

export const purchaseTicketCtrl = async (req, res, next) => {
  try {
    const { busId, departureTime, numberOfSeats, userId } = req.body;
    const purchasedTicket = await purchaseTicketService(
      busId,
      departureTime,
      numberOfSeats,
      userId
    );
    sendResponse(
      res,
      200,
      `${numberOfSeats} ticket(s) successfully purchased`,
      purchasedTicket
    );
  } catch (error) {
    next(error);
  }
};
