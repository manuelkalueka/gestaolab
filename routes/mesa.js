const express = require("express");
const router = express.Router();
const TITLE = "Mesas do Laborário";

const database = require('../database');
let mesas;

database('mesas')
  .then(mesa => { return mesas = mesa }).catch(erro => console.log(erro.errors));

router.get("/mesas", (req, res, next) => {
  res.render("mesa", {
    title: TITLE,
    mesas: mesas,
    message: null
  });
});

module.exports = router;
