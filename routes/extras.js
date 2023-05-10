const express = require('express');
const router = express.Router();
const TITULO_PAGE = 'Funções e Utilitários';

router.get('/extras', (req, res, next) => {
    if (req.session.usuario) {
        res.render('extras', { title: TITULO_PAGE });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;