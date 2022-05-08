module.exports = (req, res, next) => {
    if (req.body == null || req.body.password !== req.body.confirmPassword) {
        const validationErrors = ['Passwords do not match'];
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);

        return res.redirect('/auth/signup');
    }
    next();
};
