const express = require('express');
const router = express.Router();
const title = 'GESTAOLAB | Área de Acesso';
const database = require('../database');
const yup = require('yup');
let usuarios;

database('usuarios')
    .then(usuario => { return usuarios = usuario }).catch(erro => console.log(erro.errors));

router.get('/login', (req, res, next) => {
    res.render('login', { title: title });
});

router.get('/', (req, res, next) => {
    res.redirect('login');
});

router.post('/login', (req, res, next) => {
    let schema = yup.object({
        username: yup.string().required('Preecha o campo username'),
        senha: yup.string().required('Preecha o campo senha').min('A senha deve ter 4 carateres no mínimo')
    });

    if (!schema.isValid(req.body)) {
        res.status(400).render('login', {
            title: title,
            messagge: null
        });
    }

    const reqDados = [{ usuario: req.body.username, senha: req.body.senha }];

});

/** ROTA LOGOUT */

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('login');
})

module.exports = router;