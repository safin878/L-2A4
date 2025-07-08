"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const borrow_route_1 = __importDefault(require("./routes/borrow.route"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:5173", "https://l-2-a4.vercel.app"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome to Library Management System!!");
});
app.use("/api/books", book_route_1.default);
app.use("/api/borrow", borrow_route_1.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
