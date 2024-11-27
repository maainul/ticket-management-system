import {
  createBusService,
  deleteBusService,
  listBusService,
  updateBusService,
} from "../services/busService.js";
import { sendResponse } from "../utils/responseHelper.js";

export const listBusCtrl = async (req, res, next) => {
  try {
    const buses = await listBusService();
    sendResponse(res, 200, "Bus list retrieved successfully", buses);
  } catch (error) {
    next(error);
  }
};

export const createBusCtrl = async (req, res, next) => {
  try {
    const newBus = await createBusService(req.body);
    sendResponse(res, 201, "Bus added successfully", newBus);
  } catch (error) {
    next(error);
  }
};

export const updateBusCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBus = await updateBusService(id, req.body);
    sendResponse(res, 200, "Bus updated successfully", updatedBus);
  } catch (error) {
    next(error);
  }
};

export const deleteBusCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBus = await deleteBusService(id);
    sendResponse(res, 200, "Bus deleted successfully", deletedBus);
  } catch (error) {
    next(error);
  }
};
