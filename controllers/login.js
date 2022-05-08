module.exports = (req, res) => {
    res.render('login', {
        errors: req.flash('validationErrors'),
        loginErrors: req.flash('loginErrors'),
        success: req.flash('success')
    });
};
