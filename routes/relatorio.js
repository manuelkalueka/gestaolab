const express = require("express");
const router = express.Router();
const TITLE = "Relatórios";

router.get("/relatorios", (req, res, next) => {
  if (req.session.usuario) {
    res.render("relatorio", { title: TITLE });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;

