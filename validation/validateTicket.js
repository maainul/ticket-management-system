import Joi from "joi";

export const validateTicket = async (data) => {
  const ticketSchema = Joi.object({
    bus: Joi.string().required().messages({
      "string.base": "Bus should be a valid ObjectId",
      "string.empty": "Bus cannot be empty",
      "any.required": "Bus is required",
    }),

    departureTime: Joi.string()
      .pattern(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/) // Matches HH:mm format
      .required()
      .messages({
        "string.base": "Departure time should be a type of text",
        "string.empty": "Departure time cannot be empty",
        "string.pattern.base":
          "Departure time must follow HH:mm format (e.g., 08:30)",
        "any.required": "Departure time is required",
      }),

    price: Joi.number().min(0).required().messages({
      "number.base": "Price should be a valid number",
      "number.min": "Price must be at least 0",
      "any.required": "Price is required",
    }),

    availableSeats: Joi.number().integer().min(1).required().messages({
      "number.base": "Available seats should be a valid number",
      "number.integer": "Available seats must be an integer",
      "number.min": "Available seats must be at least 1",
      "any.required": "Available seats are required",
    }),

    bookedSeats: Joi.number().integer().min(0).messages({
      "number.base": "Booked seats should be a valid number",
      "number.integer": "Booked seats must be an integer",
      "number.min": "Booked seats must be at least 0",
    }),

    totalPrice: Joi.number().integer().min(0).messages({
      "number.base": "Total Price should be a valid number",
      "number.integer": "Total Price must be an integer",
      "number.min": "Total Price must be at least 0",
    }),
    created_by: Joi.string().required().messages({
      "string.base": "Created by should be a valid user ID",
      "string.empty": "Created by cannot be empty",
      "any.required": "Created by is required",
    }),

    updated_by: Joi.string().messages({
      "string.base": "Updated by should be a valid user ID",
    }),
    bookedby: Joi.string().messages({
      "string.base": "Updated by should be a valid user ID",
    }),
  });

  const options = { abortEarly: false, allowUnknown: false };
  return ticketSchema.validate(data, options); // Perform validation
};
