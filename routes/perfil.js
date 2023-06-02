const express = require("express");
const router = express.Router();
const TITLE = "Perfil de Usuário";
const database = require('../database');

let usuarios;

database('usuarios')
  .limit(6)
  .orderBy('username', 'asc')
  .then(usuario => { return usuarios = usuario }).catch(erro => console.log(erro.errors));

router.get("/perfil", (req, res, next) => {
  res.render("perfil", {
    title: TITLE, sessao: req.session,
    usuario: req.user,
    lista_usuarios: usuarios
  });
});

router.post('/perfil', (req, res, next) => {
  res.redirect('perfil')
})

router.get('/perfil/add', (req, res, next) => {
  res.render('add-user', { title: 'Criar novo Usuário', usuario: req.user });
});

router.post('/perfil/add', (req, res, next) => {
  console.log(req.body);
  database('usuarios').insert(req.body).then(ids => {
    redirect('/perfil');
  }).catch(error => {
    res.render('add-user', { title: 'Criar novo Usuário', usuario: req.user, message: error.erros });
  })
});
module.exports = router;
