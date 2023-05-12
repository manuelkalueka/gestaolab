const authorize = {
    isAuth: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect('login');
        }

        next();
    }
    ,
    isNotAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/dashboard');
        }

        next();
    }
}

module.exports = authorize;