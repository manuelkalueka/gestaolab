const express = require("express");
const router = express.Router();
const TITLE = "Mesas do Laborário";
const yup = require('yup');

const database = require('../database');

router.get("/mesas", async (req, res, next) => {
  try {
    async function pagination(table) {
      const numeroPagina = (req.query.pagina) || 1; //pagina actual
      const registosPorPagina = 6;
      const deslocamento = registosPorPagina * (parseInt(numeroPagina) - 1);

      const dadosTable = await database(table)
        .limit(6)
        .offset(deslocamento)
        .orderBy('nome', 'asc');
      const [total] = await database(table)
        .count('*', { as: 'total' });
      const resultado = Math.ceil(parseInt(total.total) / registosPorPagina);

      const totalPaginas = resultado == 0 ? 1 : resultado;
      return {
        dadosTable,
        totalPaginas,
        numeroPagina,
        deslocamento,
      }
    }

    const dadosPaginados = await pagination('mesas');

    const paginas = {
      actual: dadosPaginados.numeroPagina,
      anterior: parseInt(dadosPaginados.numeroPagina) - 1 < 1 ? 1 : parseInt(dadosPaginados.numeroPagina) - 1,
      proxima: parseInt(dadosPaginados.numeroPagina) + 1 > parseInt(dadosPaginados.totalPaginas) ? parseInt(dadosPaginados.totalPaginas) : parseInt(dadosPaginados.numeroPagina) + 1,
      total: dadosPaginados.totalPaginas
    }

    res.render("mesa", {
      title: TITLE,
      mesas: dadosPaginados.dadosTable,
      paginas: paginas,
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
