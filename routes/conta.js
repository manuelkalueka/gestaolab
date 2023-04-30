const express = require("express");
const router = express.Router();
const TITLE = "Gestor de Conta";

router.get("/conta", (req, res, next) => {
  res.render("conta", { title: TITLE });
});

module.exports = router;
