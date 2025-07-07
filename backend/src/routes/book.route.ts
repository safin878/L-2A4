import { Router } from "express";
import {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller";

const router = Router();

router.get("/", getBooks);
router.post("/", createBook);
router.get("/:id", getBookById);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);
export default router;
