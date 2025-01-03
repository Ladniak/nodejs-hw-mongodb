import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }

  res.status(err.status).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
