const express = require('express');
const router = express.Router();
const title = 'GESTAOLAB | Área de Acesso';

router.get('/login', (req, res, next) => {
    res.render('login', { title: title });
});

router.get('/', (req, res, next) => {
    res.redirect('login');
});

router.post('/login', (req, res, next) => {
    res.redirect('dashboard');
});

/** ROTA LOGOUT */

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('login');
})

module.exports = router;