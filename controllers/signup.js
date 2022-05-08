module.exports = (req, res) => {
    let username = '';
    let password = '';
    let confirmPassword = '';

    const data = req.flash('data')[0];
    if (data) {
        username = data.username;
        password = data.password;
        confirmPassword = data.confirmPassword;
    }

    res.render('signup', {
        errors: req.flash('validationErrors'),
        username,
        password,
        confirmPassword
    });
};
