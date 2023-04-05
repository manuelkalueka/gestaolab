const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'GESTAOLAB | Área de Acesso' });
});

router.get('/', (req, res, next) => {
    res.render('login', { title: 'GESTAOLAB | Área de Acesso' });
})

module.exports = router;