const express = require('express');
const router = express.Router();
const passport = require('passport');
const title = 'GESTAOLAB | Área de Acesso';

router.get('/login', (req, res, next) => {
    if (req.query.fail)
        res.render('login', { message: 'Usuário e/ou senha incorretos!', title: title });
    else
        res.render('login', { message: null, title: title });
});

router.get('/', (req, res, next) => {
    res.redirect('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login?fail=true'
    })

});

/** ROTA LOGOUT */

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('login');
})

module.exports = router;