const express = require("express");
const router = express.Router();
const TITLE = "Mesas do Laborário";

router.get("/mesas", (req, res, next) => {
  res.render("mesa", { title: TITLE });
});

module.exports = router;
