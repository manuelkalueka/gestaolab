const express = require("express");
const router = express.Router();
const TITLE = "Perfil de Usuário";
const {getSelectedLab} = require('../middlewares/laboratorio');

router.get("/perfil", (req, res, next) => {

  res.render("perfil", {
    title: TITLE, sessao: req.session,
    usuario: req.user, 
    laboratorioSelecionado:getSelectedLab()
  });
});

module.exports = router;
