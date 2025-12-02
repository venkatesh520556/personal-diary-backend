import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    date: { type: String, required: true }, // NEW FIELD
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
