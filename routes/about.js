const express = require("express");
const router = express.Router();
const TITLE = "Sobre Desenvolvedor";

router.get("/about", (req, res, next) => {
    if (req.session.usuario) {
        res.render("about", { title: TITLE });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
