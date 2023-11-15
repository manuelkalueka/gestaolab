const express = require('express');
const router = express.Router();
const database = require('../database')

router.get('/laboratorios', async (req, res) => {

    try {
        const laboratorios = await database('laboratorios')
        .where('responsavel', req.user.id);
        const responsaveis = await database('usuarios');

        res.render("laboratorio", {
            title: "Visão Geral sobre os Laboratórios",
            sessao: req.session,
            usuario: req.user,
            laboratorios,
            responsaveis
        });
    }
    catch (error) {
        console.log(error)
    }
});

router.post('/laboratorios/cadastrar', async (req, res) => {
    try {
        await database('laboratorios').insert(req.body)
        res.redirect('/laboratorios')
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;