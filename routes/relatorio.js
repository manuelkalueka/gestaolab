const express = require("express");
const router = express.Router();
const TITLE = "Relatórios";

router.get("/relatorios", (req, res, next) => {
  res.render("relatorio", { title: TITLE });
});

module.exports = router;

