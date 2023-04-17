const express = require('express');

const router = express.Router();

router.get("*", (req, res) => {
    res.render('404', { title: "Página não encontrada!" });
});

module.exports = router;
