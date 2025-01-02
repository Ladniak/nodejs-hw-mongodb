import createHttpError from 'http-errors';

export const handleSaveError = (err, doc, next) => {
  const { name, code } = err;
  if ((err.status = name === 'MongoServerError' && code === 11000)) {
    return next(createHttpError(409, 'Email in use'));
  }
  next();
};
