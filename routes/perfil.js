const express = require("express");
const router = express.Router();
const TITLE = "Perfil de Usuário";

router.get("/perfil", (req, res, next) => {
  res.render("perfil", {
    title: TITLE, sessao: req.session,
    usuario: req.user
  });
});

router.get('/perfil/add', (req, res, next) => {
  res.render('add-user', { title: 'Criar novo Usuário', usuario: null});
});

module.exports = router;
