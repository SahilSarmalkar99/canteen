import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    img: {
      type: String, // Store image URL or file path
      // required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    availableTime: {
      type: [String],
      enum: ["evergreen", "morning", "afternoon", "evening"],
      default: ["evergreen"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);