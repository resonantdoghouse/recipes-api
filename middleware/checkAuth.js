module.exports = (req, res, next) => {
  const secret = 'neocat';
  if (req.query.api_key !== secret) {
    res.status(401).json({ message: 'not authorized' });
    next();
  } else {
    next();
  }
};
