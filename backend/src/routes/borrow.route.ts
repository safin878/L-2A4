import { Router } from "express";
import { borrowBook, getBorrowSummary } from "../controllers/borrow.controller";

const router = Router();

router.post("/:bookId", borrowBook);
router.get("/summary", getBorrowSummary);

export default router;
