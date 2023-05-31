const express = require('express');
const router = express.Router();
const TITULO_PAGE = 'Dashboard';
const database = require('../database');
let total_mesas;

database('mesas').count().then((total) => {
    return total_mesas = total;
}).catch((err) => {

});
router.get('/dashboard', (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
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
    res.status(200).redirect('dashboard');
});

module.exports = router;