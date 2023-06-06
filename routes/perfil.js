const express = require("express");
const router = express.Router();
const TITLE = "Perfil de Usuário";
const database = require('../database');
const yup = require('yup');
const bcrypt = require('bcryptjs');

let usuarios;

database('usuarios')
  .limit(6)
  .orderBy('nome_completo', 'asc')
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
  const reqDados = {
    nome_completo: req.body.nome_completo,
    bi: req.body.bi,
    genero: req.body.genero,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    tipo_conta: req.body.tipo_conta
  }
  let schema = yup.object({
    nome_completo: yup.string().required("Preecha o campo nome"),
    bi: yup.string().max(14),
    genero: yup.string().required("Preecha o genero"),
    username: yup.string().required("preecha o username").lowercase("O username deve ser minusculos"),
    password: yup.string().required("Preecha a Palavra Passe").min(4)
  });

  if (!schema.isValid(req.body) || usuarios.forEach(usuario => {
    if (usuario.username == reqDados.username) {
      return true;
    }
  })) {
    res.status(400).render("add-user",
      {
        title: TITLE,
        message: {
          erro: true,
          texto: "erro",
        },
        sessao: req.session,
        usuario: req.user
      });
  }
  database('usuarios').insert(reqDados)
    .then((ids) => {
      res.redirect('/perfil');
    }, next)
});


module.exports = router;
