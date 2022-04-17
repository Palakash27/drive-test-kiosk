const User = require('../model/user');

module.exports = (req, res) => {
  console.log('this is body', req.body);
  User.create(req.body, (err, user) => {
    if (err) {
      const validationErrors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      req.flash('validationErrors', validationErrors);
      req.flash('data', req.body);
      return res.redirect('/auth/signup');
    }
    req.flash('success', 'User created successfully');
    res.redirect('/auth/login');
  });
};
