const express = require("express");
const router = express.Router();
const TITLE = "Mesas do Laborário";
const yup = require('yup');

const database = require('../database');
let mesas;

database('mesas')
  .orderBy('nome', 'asc')
  .limit(6)
  .then(mesa => { return mesas = mesa }).catch(erro => console.log(erro.errors));

router.get("/mesas", (req, res, next) => {
  res.render("mesa", {
    title: TITLE,
    mesas: mesas,
    message: null
  });
});

router.post('/mesas', (req, res, next) => {
  const reqDados = req.body;

  let schema = yup.object({
    nome: yup.string().required("Preecha o campo nome!"),
    estado: yup.string().default('Espaço livre')
  });

  if (!schema.isValid(reqDados)) {
    res.status(400).render("mesas",
      {
        title: TITLE,
        mesas: null,
        message: {
          erro: true,
          texto: "erro"
        }
      });
  } else {
    database('mesas')
      .insert(reqDados)
      .then(ids => {
        res.redirect('mesas');
      }, next);
  }
})
module.exports = router;
