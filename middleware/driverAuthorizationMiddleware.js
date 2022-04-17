module.exports = (req, res, next) => {
  if (req.session.userType !== 'driver') {
    return res.redirect('/');
  }
  next();
};
