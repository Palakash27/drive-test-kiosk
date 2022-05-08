module.exports = (req, res, next) => {
    if (req.session.userType !== 'examiner') {
        return res.redirect('/');
    }

    next();
};
