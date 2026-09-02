const notFound = (req, res) => {
  res.status(404).json({ message: 'Route not found' });
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: status === 500 ? 'Something went wrong. Please try again.' : err.message,
  });
};

module.exports = { notFound, errorHandler };
