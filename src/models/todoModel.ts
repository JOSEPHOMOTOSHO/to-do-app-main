import mongoose from "mongoose";
import { Schema } from "mongoose";

const toDoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<{ todo: string }>("todos", toDoSchema);
