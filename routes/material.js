const express = require("express");
const router = express.Router();
const database = require('../database')

const TITLE = "Materiais do Laboratório";

router.get("/materiais", (req, res, next) => {
    database("materiais").then((materiais) => {
        res.render("material", { title: TITLE, materiais: materiais });
    }, next);

});

router.post("/materiais", (req, res, next) => {
    res.render("material", { title: TITLE });
});

router.put('/materiais/:id', (req, res, next) => {

});

router.delete('/materiais/:id', (req, res, next) => {

});

module.exports = router;
