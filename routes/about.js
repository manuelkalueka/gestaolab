const express = require("express");
const router = express.Router();
const TITLE = "Sobre o GestaoLAB";

router.get("/about", (req, res, next) => {
        res.render("about", {
                title: TITLE, sessao: req.session,
                usuario: req.user
        });
});

module.exports = router;
