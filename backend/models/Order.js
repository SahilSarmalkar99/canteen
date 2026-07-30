import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    items: [
      {
        Food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    closed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);