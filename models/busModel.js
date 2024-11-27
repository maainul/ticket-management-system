import mongoose from "mongoose";

// Define the structure of the Bus document
const busScheduleSchema = new mongoose.Schema(
  {
    dayOfWeek: {
      type: String,
      required: true,
      enum: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
    },
    departureTime: { type: String, required: true },
  },
  { _id: false }
);

const busSchema = new mongoose.Schema(
  {
    busNumber: { type: String, required: true, unique: true },
    busName: { type: String, required: true },
    route: { type: String, required: true },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
      max: [1000, "Capacity cannot exceed 1000"],
    },
    schedule: [busScheduleSchema], // Array of schedules for different days
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("bus", busSchema);
