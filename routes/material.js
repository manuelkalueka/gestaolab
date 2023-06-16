const express = require("express");
const router = express.Router();
const database = require('../database');
const yup = require('yup');
const moment = require('moment');

const TITLE = "Materiais do Laboratório";
let materiais;
let mesas;

database('materiais')
    .limit(6)
    .orderBy('nome', 'asc')
    .then(material => { return materiais = material }).catch(erro => console.log(erro.message));
database('mesas')
    .then(mesa => { return mesas = mesa }).catch(erro => console.log(erro.message));

router.get("/materiais", (req, res, next) => {
    if (req.query.pesquisa) {
        if (req.query.pesquisa.valueOf != '') {
            //Fazer pesquisa aqui
        }
    }
    res.render("material",
        {
            title: TITLE,
            materiais: materiais,
            mesas: mesas,
            message: null,
            sessao: req.session,
            usuario: req.user
        });
});

router.post("/materiais", (req, res, next) => {
    const reqDados = req.body;
    let dadosValidados = yup.object({
        nome: yup.string().required("Preencha o campo nome").strict(),
        marca: yup.string().default("Sem marca"),
        modelo: yup.string().default("Sem modelo"),
        tipo_material: yup.string(),
        data_compra: yup.date(),
        estado: yup.string(),
        capacidade: yup.string().required("Digite as capacidades do PC").max(45),
        tem_programas: yup.string().default("Sim"),
        mesa: yup.number().positive().required("Informe a mesa deste material").strict(),
        observacoes: yup.string()
    });

    if (!dadosValidados.isValid(reqDados)) {
        res.status(400).render("material",
            {
                title: TITLE,
                materiais: {},
                mesas: null,
                message: {
                    erro: true,
                    texto: "erro.errors",
                },
                sessao: req.session,
                usuario: req.user
            });
    }

    database('materiais').insert(reqDados)
        .then((ids) => {
            res.redirect('materiais');
        }, next)
});

router.get('/materiais/:id', (req, res, next) => {
    const { id } = req.params;
    database('materiais')
        .where('id', id)
        .then((result) => {
            if (!result) {
                res.sendStatus(400);
                return;
            }

            res.json(result);
        }, next);
});

router.put('/materiais/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(req.body + " Meu Body");
    database('materiais')
        .where('id', id)
        .update(req.body)
        .then(result => {
            if (result == 0) {
                return res.send(400)
            }

            res.json(result);
        }, next);
});

//Apagar apenas um unico resgisto
router.delete('/materiais/:id', (req, res, next) => {
    const { id } = req.params;
    // console.log("deletando" + id);
    database('materiais')
        .where("id", id)
        .delete()
        .then((result) => {
            if (result === 0) {
                return res.send(400);
            }
            res.redirect('/materiais');
        }, next);
});


//apaga todos os registos da BD
router.delete('/materiais', (req, res, next) => {
    database('materiais')
        .truncate()
        .then(() => {
            const messages = {
                sucesso: "Registos apagados com sucesso!",
                falha: "Não conseguimos apagar os teus Registos",
            }

            res.send(messages);
        }, next);
});

module.exports = router;
