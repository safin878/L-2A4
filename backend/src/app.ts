import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.route";
import borrowRoutes from "./routes/borrow.route";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://l-2-a4.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Library Management System!!");
});

app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
