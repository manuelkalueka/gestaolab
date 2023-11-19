const express = require("express");
const router = express.Router();
const TITLE = "Perfil de Usuário";
const { getSelectedLab } = require("../middlewares/laboratorio");
const database = require("../database");

router.get("/perfil", async (req, res, next) => {
  let labName;

  if (!getSelectedLab()) {
    labName = { nome: "" };
  } else {
    labName = await database("laboratorios")
      .where({ id: getSelectedLab() })
      .select("nome")
      .first();
  }

  res.render("perfil", {
    title: TITLE,
    sessao: req.session,
    usuario: req.user,
    laboratorioSelecionado: getSelectedLab(),
    labName: labName.nome,
  });
});

module.exports = router;
