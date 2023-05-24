const express = require("express");
const router = express.Router();
const database = require('../database');
const yup = require('yup');

const TITLE = "Materiais do Laboratório";

router.get("/materiais", (req, res, next) => {
    database("materiais")
        .limit(6)
        .then((materiais) => {
            res.render("material",
                {
                    title: TITLE,
                    materiais: materiais,
                    mesas: null,
                    message: null
                });
        }, next);
});

router.post("/materiais", (req, res, next) => {
    const reqDados = req.body;
    let dadosValidados = yup.object({
        nome: yup.string().required("Preencha o campo nome").strict(),
        marca: yup.string().default("Sem marca"),
        modelo: yup.string().default("Sem modelo"),
        tipo_material: yup.string(),
        data_compra: yup.date().default(() => new Date()),
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
                    texto: erro.errors
                }
            });
    }

    database('materiais').insert(reqDados).then(() => {
        res.redirect('materiais');
    }).catch(err => {
        res.send(err.errors);
    });
});

module.exports = router;
