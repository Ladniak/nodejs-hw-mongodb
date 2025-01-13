export const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({
        status: statusCode,
        message: error.message,
      });
    }
  };
  return func;
};
