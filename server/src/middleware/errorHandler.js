import config from '../config/env.js';

export function errorHandler(err, req, res, next) {
  let statusCode = err.status || err.statusCode || res.statusCode;
  if (statusCode === 200) statusCode = 500;

  let message = err.message || 'Internal Server Error';

  // Handle Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Log server errors
  if (statusCode >= 500) {
    console.error(`[ERROR] ${req.method} ${req.url}:`, err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(config.env === 'development' && { stack: err.stack }),
  });
}
