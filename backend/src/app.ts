import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.route";
import borrowRoutes from "./routes/borrow.route";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Library Management System!!");
});

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
