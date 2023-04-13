const express = require('express');
const router = express.Router();
const TITULO_PAGE = 'Dashboard';

router.get('/dashboard', (req, res, next) => {
    res.render('dashboard', { title: TITULO_PAGE });
});

router.post('/dashboard', (req, res, next) => {
    res.render('dashboard', { title: TITULO_PAGE });
});

module.exports = router;