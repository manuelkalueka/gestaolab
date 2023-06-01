const express = require("express");
const router = express.Router();
const TITLE = "Configurações do Sistema";

router.get("/settings", (req, res, next) => {
    res.render("setting", {
        title: TITLE, sessao: req.session,
        usuario: req.user
    });
});

module.exports = router;
