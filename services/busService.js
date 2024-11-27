import { validateBus } from "../validation/validateBus.js";
import busModel from "../models/busModel.js";
import mongoose from "mongoose";

export const createBusService = async (busData) => {
  const { error, value } = await validateBus(busData);
  if (error) {
    throw {
      status: 400,
      details: error.details.map((detail) => ({
        label: detail.context.label,
        message: detail.message.replace(/"/g, ""),
      })),
    };
  }
  const nameExists = await busModel.findOne({
    busNumber: busData.busNumber,
  });
  if (nameExists) {
    throw {
      status: 400,
      details: [
        {
          label: "busNumber",
          message: "Bus Number Already Exists",
        },
      ],
    };
  }
  const newBus = await busModel.create(value);
  return newBus;
};

export const listBusService = async () => {
  try {
    const buses = await busModel.find();
    return buses;
  } catch (error) {
    throw new Error("Error retrieving buses from the database");
  }
};

export const updateBusService = async (busId, busData) => {
  // Validate bus ID format (if using MongoDB ObjectId)
  if (!busId.match(/^[0-9a-fA-F]{24}$/)) {
    throw { status: 400, message: "Invalid bus ID format" };
  }

  // Find and update the bus
  const updatedBus = await busModel.findByIdAndUpdate(busId, busData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure Mongoose validators run
  });
  if (!updatedBus) {
    throw { status: 404, message: "Bus not found" };
  }
  return updatedBus;
};

export const deleteBusService = async (busId) => {
  // Validate the bus ID format
  if (!mongoose.Types.ObjectId.isValid(busId)) {
    throw { status: 400, message: "Invalid bus ID format" };
  }

  // Attempt to delete the bus
  const deletedBus = await busModel.findByIdAndDelete(busId);

  // If bus not found, throw a 404 error
  if (!deletedBus) {
    throw { status: 404, message: "Bus not found" };
  }

  // Return the deleted bus
  return deletedBus;
};
