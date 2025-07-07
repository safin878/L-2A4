import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;
    const { quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.copies < quantity) {
      res.status(400).json({ message: "Not enough copies available" });
      return;
    }

    book.copies -= quantity;
    await book.save();
    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });
    res.status(201).json(borrow);
  } catch (error) {
    res.status(500).json({ message: "Error borrowing book", error });
  }
};

export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book", // group by book ObjectId
          totalBorrowed: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books", // collection name
          localField: "_id", // grouped book id
          foreignField: "_id", // book's _id field
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails", // single book details instead of array
      },
      {
        $project: {
          bookId: "$_id", // add bookId for frontend key
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
          totalQuantity: "$totalBorrowed",
          _id: 0, // hide the default _id from result
        },
      },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrow summary", error });
  }
};
