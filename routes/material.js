const express = require("express");
const router = express.Router();
const database = require('../database')

const TITLE = "Materiais do Laboratório";

router.get("/materiais", (req, res, next) => {
    database("materiais")
        .limit(6)
        .then((materiais) => {
            res.render("material",
                {
                    title: TITLE, materiais: materiais,
                    message: null
                });
        }, next);
});

router.post("/materiais", (req, res, next) => {
    console.log(req.body);
    database('materiais').insert(req.body).then(() => {
        res.render('material', {
            title: TITLE,
            message: req.body.nome + ' inserido com sucesso',
            materiais: {}
        });
    }).catch(err => {
        res.send(err);
    });
});

router.put('/materiais/:id', (req, res, next) => {

});

router.delete('/materiais/:id', (req, res, next) => {

});

module.exports = router;
