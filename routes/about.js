const express = require("express");
const router = express.Router();
const TITLE = "Sobre Desenvolvedor";

router.get("/about", (req, res, next) => {
        res.render("about", { title: TITLE });
});

module.exports = router;
