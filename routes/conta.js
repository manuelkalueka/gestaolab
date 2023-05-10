const express = require("express");
const router = express.Router();
const TITLE = "Gestor de Conta";

router.get("/conta", (req, res, next) => {
  if (req.session.usuario) {
    res.render("conta", { title: TITLE });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
