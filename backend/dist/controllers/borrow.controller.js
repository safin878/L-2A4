"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { quantity, dueDate } = req.body;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book || book.copies < quantity) {
            res.status(400).json({ message: "Not enough copies available" });
            return;
        }
        book.copies -= quantity;
        yield book.save();
        const borrow = yield borrow_model_1.Borrow.create({
            book: bookId,
            quantity,
            dueDate,
        });
        res.status(201).json(borrow);
    }
    catch (error) {
        res.status(500).json({ message: "Error borrowing book", error });
    }
});
exports.borrowBook = borrowBook;
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching borrow summary", error });
    }
});
exports.getBorrowSummary = getBorrowSummary;
