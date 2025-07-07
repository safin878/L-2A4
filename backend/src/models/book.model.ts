import { Schema, model, Document } from "mongoose";
import { IBook } from "./../interfaces/book.interface";

export interface IBookModel extends IBook, Document {}

const bookSchema = new Schema<IBookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, default: 1 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Middleware: before save, update 'available' field automatically
bookSchema.pre("save", function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});

export const Book = model<IBookModel>("Book", bookSchema);
