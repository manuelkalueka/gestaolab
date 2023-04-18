const express = require('express');
const router = express.Router();

const TITULO = 'Cadastro de Materiais do Laboratório';

router.get('/materiais', (req, res, next) => {
    res.render('material', { title: TITULO });
});

router.post('/materiais', (req, res, next) => {
    res.render('material', { title: TITULO });
});

module.exports = router;