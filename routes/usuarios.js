const express = require('express');
const router = express.Router();
const TITLE = 'Usuários Cadastrados';
const database = require('../database');
const yup = require('yup');
const bcrypt = require('bcryptjs');

router.get("/usuarios", async (req, res, next) => {
    try {

        const usuarios = await database('usuarios')
            .limit(6)
            .orderBy('nome_completo', 'asc');
        res.render("usuarios", {
            title: TITLE,
            sessao: req.session,
            usuario: req.user,
            lista_usuarios: usuarios
        });

    } catch (erro) {
        console.log(erro.message);
    }
});


router.post('/usuarios', (req, res, next) => {
    res.redirect('/usuarios')
})

router.get('/usuarios/add', (req, res, next) => {
    res.render('add-user', { title: 'Criar novo Usuário', usuario: req.user });
});

router.post('/usuarios/add', (req, res, next) => {
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

    if (!schema.isValid(req.body)) {

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
            res.redirect('/usuarios');
        }, next)
});

module.exports = router;