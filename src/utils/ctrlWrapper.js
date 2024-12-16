export const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
    }
  };
  return func;
};
