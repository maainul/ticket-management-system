import Joi from "joi";

export const validateBus = async (data) => {
  const busSchema = Joi.object({
    busNumber: Joi.string().min(1).max(50).required().messages({
      "string.base": "Bus number should be a type of text",
      "string.empty": "Bus number can not be empty",
      "string.min": "Bus number should have at least 1 character",
      "string.max": "Bus number should not exceed 50 characters",
      "any.required": "Bus number is required",
    }),

    busName: Joi.string().min(3).max(50).required().messages({
      "string.base": "Bus name should be a type of text",
      "string.empty": "Bus name can not be empty",
      "string.min": "Bus name should have at least 3 characters",
      "string.max": "Bus name should not exceed 50 characters",
      "any.required": "Bus name is required",
    }),

    route: Joi.string().min(3).max(100).required().messages({
      "string.base": "Route should be a type of text",
      "string.empty": "Route can not be empty",
      "string.min": "Route should have at least 3 characters",
      "string.max": "Route should not exceed 100 characters",
      "any.required": "Route is required",
    }),

    capacity: Joi.number().integer().min(1).max(1000).required().messages({
      "number.base": "Capacity should be a type of number",
      "number.integer": "Capacity must be an integer",
      "number.min": "Capacity must be at least 1",
      "number.max": "Capacity cannot exceed 1000",
      "any.required": "Capacity is required",
    }),

    schedule: Joi.array()
      .items(
        Joi.object({
          dayOfWeek: Joi.string()
            .valid(
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            )
            .required()
            .messages({
              "string.base": "Day of the week should be a type of text",
              "string.empty": "Day of the week can not be empty",
              "any.required": "Day of the week is required",
              "any.only":
                "Day of the week must be one of the following: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
            }),

          departureTime: Joi.string()
            .pattern(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/) // HH:mm format
            .required()
            .messages({
              "string.base": "Departure time should be a type of text",
              "string.empty": "Departure time can not be empty",
              "string.pattern.base":
                "Departure time must follow HH:mm format (e.g., 08:30)",
              "any.required": "Departure time is required",
            }),
        })
      )
      .required()
      .messages({
        "array.base": "Schedule should be an array",
        "array.empty": "Schedule cannot be empty",
        "any.required": "Schedule is required",
      }),

    created_by: Joi.string().messages({
      "string.base": "Created by should be a valid user ID",
    }),

    updated_by: Joi.string().messages({
      "string.base": "Updated by should be a valid user ID",
    }),
  });

  const options = { abortEarly: false, allowUnknown: false };
  return busSchema.validate(data, options); // Return async validation
};
