const errorHandler = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.statusCode || 500;
  res.status(status).json({
    message: status === 500 ? 'Something went wrong. Please try again.' : err.message,
  });
};

module.exports = errorHandler;
