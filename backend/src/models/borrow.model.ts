import { Schema, model, Document } from "mongoose";
import { IBorrow } from "./../interfaces/borrow.interface";
export interface IBorrowModel extends IBorrow, Document {}

const borrowSchema = new Schema<IBorrowModel>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Borrow = model<IBorrowModel>("Borrow", borrowSchema);
