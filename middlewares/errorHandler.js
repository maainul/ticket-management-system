export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };
  if (err.details) response.error = err.details;

  console.log("Error:", err);
  res.status(status).json(response);
};
