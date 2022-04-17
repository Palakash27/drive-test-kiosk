const User = require('../model/user');

module.exports = (req, res) => {
  let body = req.body;

  const updatedUser = {
    comments: body.comments,
    examiner_feedback: body.result === 'passed' ? true : false
  };

  User.findByIdAndUpdate(body.user_id, updatedUser, (err, user) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.redirect('/');
    }
  });
};
