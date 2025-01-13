import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error caught by errorHandler:', err);

  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: 'Something went wrong',
    data: err.message,
  });
};
