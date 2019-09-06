module.exports = (req, res, next) => {
  req.user = {
    sub: 'fake-user|1234'
  };

  next();
};
