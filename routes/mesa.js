const express = require("express");
const router = express.Router();
const TITLE = "Mesas do Laborário";
const yup = require('yup');

const database = require('../database');

router.get("/mesas", async (req, res, next) => {
  try {
    const mesas = await database('mesas')
      .orderBy('nome', 'asc')
      .limit(6);

    res.render("mesa", {
      title: TITLE,
      mesas: mesas,
      message: null,
      sessao: req.session,
      usuario: req.user
    });
  }
  catch (erro) {
    console.log(erro.message);
  }
});

router.post('/mesas', async (req, res, next) => {
  const reqDados = await req.body;

  let schema = yup.object({
    nome: yup.string().required("Preecha o campo nome!"),
    estado: yup.string().default('Espaço livre')
  });

  if (!schema.isValid(reqDados)) {
    try {
      const mesas = await database('mesas')
        .orderBy('nome', 'asc')
        .limit(6);

      res.status(400).render("mesas",
        {
          title: TITLE,
          mesas: mesas,
          message: {
            erro: true,
            texto: "erro"
          },
          sessao: req.session,
          usuario: req.user
        });
    } catch (erro) {
      console.log(erro.message);
    }
  } else {
    await database('mesas')
      .insert(reqDados)
      .then(ids => {
        res.redirect('mesas');
      }, next);
  }
})
module.exports = router;
