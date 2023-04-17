const express = require('express');
const router = express.Router();
const title = 'GESTAOLAB | Área de Acesso';

router.get('/login', (req, res, next) => {
    res.render('login', { title: title });
});

router.get('/', (req, res, next) => {
    res.render('login', { title: title });
});

module.exports = router;