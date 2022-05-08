const User = require('../model/User');

module.exports = (req, res) => {
    const { body } = req;

    const updatedUser = {
        comments: body.comments,
        examiner_feedback: body.result === 'passed'
    };

    User.findByIdAndUpdate(body.user_id, updatedUser, (err, user) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.redirect('/');
        }
    });
};
