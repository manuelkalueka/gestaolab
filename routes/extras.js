const express = require('express');
const router = express.Router();
const TITULO_PAGE = 'Funções e Utilitários';

router.get('/extras', (req, res, next) => {
    res.render('extras', {
        title: TITULO_PAGE, sessao: req.session,
        usuario: req.user
    });
});

module.exports = router;