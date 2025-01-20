import createHttpError from 'http-errors';

export const validateBody = (shema) => {
  const func = async (req, res, next) => {
    try {
      await shema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      next(createHttpError(400, error.message));
    }
  };
  return func;
};
