import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
      index: true,
    },

    category: {
      type: String,
      enum: ["electronics", "documents", "accessories", "others"],
      required: true,
      index: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    image: {
      type: String, // Cloudinary image URL
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // 🔥 RESOLUTION STATE
    isResolved: {
      type: Boolean,
      default: false,
      index: true,
    },

    resolvedAt: {
      type: Date,
    },

    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/* Compound index for fast filtering */
itemSchema.index({ type: 1, category: 1, location: 1 });

export const Item = mongoose.model("Item", itemSchema);
