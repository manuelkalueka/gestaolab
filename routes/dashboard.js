const express = require('express');
const router = express.Router();
const TITULO_PAGE = 'Dashboard';
const database = require('../database');

router.get('/dashboard', (req, res, next) => {
    res.render('dashboard', {
        title: TITULO_PAGE,
        total_mesas: 2,
        total_pc: 12,
        total_pc_avaria: 5,
        total_pc_incompleto: 2,
        sessao: req.session,
        usuario: req.user
    });
});

router.post('/dashboard', (req, res, next) => {
    res.redirect('dashboard');
});

module.exports = router;