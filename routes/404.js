const express = require('express');

const router = express.Router();

router.get("/404", (req, res) => {
    res.render('404', { title: "Página não encontrada!" });
});

module.exports = router;
