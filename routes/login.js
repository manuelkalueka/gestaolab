const express = require('express');
const router = express.Router();
const title = 'GESTAOLAB | Área de Acesso';

const database = require('../database');

router.get('/login', (req, res, next) => {
    if (req.session.usuario) {//verifica sessao iniciada antes de entrar no sistema
        res.redirect('/dashboard');
    } else {
        res.render('login', { title: title });
    }
});

router.get('/', (req, res, next) => {
    res.redirect('login');
});

router.post('/dashboard', (req, res, next) => {
    const dadosAcesso = {
        reqUsuario: req.body.username,
        reqSenha: req.body.senha
    }

    // console.log(dadosAcesso);

    database('usuarios').then((usuarios) => {
        usuarios.forEach(usuario => {
            if (dadosAcesso.reqUsuario == usuario.nome_usuario && dadosAcesso.reqSenha == usuario.senha) {
                req.session.usuario = dadosAcesso.reqUsuario;//guarda usuario na sessao
                res.render('dashboard', { title: 'Dashboard'});
            } else {
                res.redirect('/login');
            }
        });
    }, next);
});

module.exports = router;