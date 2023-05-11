const express = require('express');
const router = express.Router();
const TITULO_PAGE = 'Dashboard';

router.get('/dashboard', (req, res, next) => {
    if (req.session.usuario) {
        res.render('dashboard', { title: TITULO_PAGE});
    } else {
        res.redirect('/login');
    }
});

module.exports = router;