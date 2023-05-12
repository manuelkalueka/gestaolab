const express = require('express');
const passport = require('passport');
const router = express.Router();
const title = 'GESTAOLAB | Área de Acesso';

router.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('dashboard');
    } else {
        res.render('login', { title: title });
    }
});

router.get('/', (req, res, next) => {
    res.redirect('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/error'
}));

/** ROTA LOGOUT */

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('login');
})

module.exports = router;