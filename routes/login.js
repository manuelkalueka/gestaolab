const express = require('express');
const router = express.Router();
var passport = require('passport');
const title = 'GESTAOLAB | Área de Acesso';

router.get('/login', (req, res, next) => {
    if (req.query.fail) {
        res.render('login', { message: 'Usuário e/ou senha incorretos!', title: title });
    }
    else {
        res.render('login', { message: null, title: title });
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login?fail=true',
}));

/** ROTA LOGOUT */

router.post('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/', (req, res, next) => {
    res.redirect('login');
});



module.exports = router;