import { validateTicket } from "../validation/validateTicket.js";
import ticketModel from "../models/ticketModel.js";
import mongoose from "mongoose";
import busModel from "../models/busModel.js";

export const createTicketService = async (ticketData) => {
  const { error, value } = await validateTicket(ticketData);
  if (error) {
    throw {
      status: 400,
      details: error.details.map((detail) => ({
        label: detail.context.label,
        message: detail.message.replace(/"/g, ""),
      })),
    };
  }

  const { bus } = ticketData;
  if (!mongoose.Types.ObjectId.isValid(bus)) {
    throw {
      status: 400,
      details: [
        {
          label: "bus",
          message: "Invalid bus ID format",
        },
      ],
    };
  }

  // Check if bus exists
  const busExists = await busModel.findById(bus);
  if (!busExists) {
    throw {
      status: 400,
      details: [
        {
          label: "bus",
          message: "Bus not found",
        },
      ],
    };
  }

  //duplicate tickets (same bus, departure time)
  const existingTicket = await ticketModel.findOne({
    bus: bus,
    departureTime: ticketData.departureTime,
  });

  if (existingTicket) {
    throw {
      status: 400,
      details: [
        {
          label: "ticket",
          message:
            "A ticket with the same bus and departure time already exists",
        },
      ],
    };
  }
  const newTicket = await ticketModel.create(value);
  return newTicket;
};

export const listTicketService = async () => {
  try {
    // Retrieve all tickets and populate bus details
    const tickets = await ticketModel
      .find()
      .populate("bus", "busNumber busName route capacity");
    return tickets;
  } catch (error) {
    throw new Error("Error retrieving ticketes from the database");
  }
};

export const updateTicketService = async (ticketId, ticketData) => {
  // Validate ticket ID format (if using MongoDB ObjectId)
  if (!ticketId.match(/^[0-9a-fA-F]{24}$/)) {
    throw { status: 400, message: "Invalid ticket ID format" };
  }

  // Find and update the ticket
  const updatedTicket = await ticketModel.findByIdAndUpdate(
    ticketId,
    ticketData,
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure Mongoose validators run
    }
  );
  if (!updatedTicket) {
    throw { status: 404, message: "Ticket not found" };
  }
  return updatedTicket;
};

export const deleteTicketService = async (ticketId) => {
  // Validate the ticket ID format
  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    throw { status: 400, message: "Invalid ticket ID format" };
  }

  // Attempt to delete the ticket
  const deletedTicket = await ticketModel.findByIdAndDelete(ticketId);

  // If ticket not found, throw a 404 error
  if (!deletedTicket) {
    throw { status: 404, message: "Ticket not found" };
  }

  // Return the deleted ticket
  return deletedTicket;
};

export const purchaseTicketService = async (
  busId,
  departureTime,
  numberOfSeats,
  userId
) => {
  try {
    // Check Ticket exists or not
    const ticket = await ticketModel.findOne({
      bus: busId,
      departureTime: departureTime,
    });

    if (!ticket) {
      throw {
        status: 404,
        details: [
          {
            label: "ticket",
            message:
              "Ticket not found for the specified bus and departure time",
          },
        ],
      };
    }
    // Check if the available seats are sufficient
    if (ticket.availableSeats < numberOfSeats) {
      throw {
        status: 400,
        details: [
          {
            label: "seats",
            message: "Not enough available seats",
          },
        ],
      };
    }
    // Update the available seats and booked seats
    ticket.availableSeats -= numberOfSeats;
    ticket.bookedSeats += numberOfSeats;
    ticket.totalPrice += ticket.price * numberOfSeats;
    ticket.bookedBy = userId;
    const updatedTicket = await ticket.save();
    return updatedTicket;
  } catch (error) {
    throw error;
  }
};
