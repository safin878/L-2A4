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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.createBook = exports.getBooks = void 0;
const book_model_1 = require("../models/book.model");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.Book.find();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
});
exports.getBooks = getBooks;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = new book_model_1.Book(req.body);
        const savedBook = yield newBook.save();
        res.status(201).json(savedBook);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating book", error });
    }
});
exports.createBook = createBook;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching book by Id", error });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!book) {
            res.status(404).json({ message: "Book not found for Update" });
            return;
        }
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
});
exports.deleteBook = deleteBook;
