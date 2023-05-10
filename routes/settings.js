const express = require("express");
const router = express.Router();
const TITLE = "Configurações do Sistema";

router.get("/settings", (req, res, next) => {
    if (req.session.usuario) {
        res.render("setting", { title: TITLE });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
