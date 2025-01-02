export const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      res.status(500).json({
        status: error.status,
        message: error.message,
      });
    }
  };
  return func;
};
