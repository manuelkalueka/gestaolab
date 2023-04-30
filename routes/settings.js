const express = require("express");
const router = express.Router();
const TITLE = "Configurações do Sistema";

router.get("/settings", (req, res, next) => {
    res.render("setting", { title: TITLE });
});

module.exports = router;
