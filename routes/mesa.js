const express = require("express");
const router = express.Router();
const TITLE = "Mesas do Laborário";

router.get("/mesas", (req, res, next) => {
  if (req.session.usuario) {
    res.render("mesa", { title: TITLE });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
