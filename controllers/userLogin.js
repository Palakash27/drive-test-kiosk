const bcrypt = require('bcrypt');
const User = require('../model/user');

module.exports = (req, res) => {
  const { username, password } = req.body;
  console.log('username password: ', username, password);

  if (!username || !password) {
    const validationErrors = ['Username and password are required'];
    req.flash('validationErrors', validationErrors);
    return res.redirect('/auth/login');
  }

  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log('Error: ', err);
    } else if (!user) {
      const loginErrors = [`User with '${username}' username not found`];
      req.flash('loginErrors', loginErrors);
      return res.redirect('/auth/login');
    } else {
      bcrypt.compare(password, user.password, (err, same) => {
        if (err) {
          console.log('Error: ', err);
        } else if (same) {
          console.log('user: ', user);
          req.session.userId = user._id;
          req.session.userType = user.userType;
          res.redirect('/');
        } else {
          const loginErrors = ['Incorrect username or password'];
          req.flash('loginErrors', loginErrors);
          return res.redirect('/auth/login');
        }
      });
    }
  });
};
