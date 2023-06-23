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

router.post('/mesas/cadastrar', async (req, res, next) => {
  try {
    const reqDados = await req.body;

    let schema = yup.object({
      nome: yup.string().required("Preecha o campo nome!"),
      estado: yup.string().default('Espaço livre')
    });

    if (!schema.isValid(reqDados)) {
      res.status(400).redirect('/mesas');

    } else {
      await database('mesas')
        .insert(reqDados)
        .then(ids => {
          res.redirect('/mesas');
        }, next);
    }
  } catch (erro) {
    console.log(erro.message);
  }
})

router.get('/mesas/:id', async (req, res, next) => {
  const { id } = req.params;
  await database('mesas')
    .where('id', id)
    .then((result) => {
      if (!result) {
        res.send(400);
        return;
      }

      res.json(result);
    }, next);
});

router.put('/mesas/:id', async (req, res, next) => {
  const { id } = req.params;
  await database('mesas')
    .where('id', id)
    .update(req.body)
    .then(result => {
      if (result == 0) {
        return res.send(400)
      }

      res.redirect('/mesas');
    }, next);
});

//Apagar apenas um unico resgisto
router.delete('/mesas/:id', async (req, res, next) => {
  const { id } = req.params;
  // console.log("deletando" + id);
  database('mesas')
    .where("id", id)
    .delete()
    .then((result) => {
      if (result === 0) {
        return res.send(400);
      }
      res.redirect('/mesas');
    }, next);
});

//apaga todos os registos da BD
router.delete('/mesas', async (req, res, next) => {
  await database('mesas')
    .truncate()
    .then(() => {
      res.redirect('/mesas');
    }, next);
});

module.exports = router;
