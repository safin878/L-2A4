import { ErrorRequestHandler } from "express";
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Set the response status code and send the error message
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });

  // Call the next middleware in the stack
  next();
};
