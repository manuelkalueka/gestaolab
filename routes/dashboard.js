const express = require('express');

const isAuth = require('../middlewares/authorize.js').isAuth;
const isNotAuth = require('../middlewares/authorize.js').isNotAuth;

const router = express.Router();
const TITULO_PAGE = 'Dashboard';

const database = require('../database');

router.get('/dashboard', isAuth, (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }

    res.render('dashboard', {
        title: TITULO_PAGE,
        session: req.session,
        usuario: req.user
    });
});

router.post('/dashboard', (req, res, next) => {
    res.redirect('dashboard');
});


module.exports = router;