const express = require("express");
const router = express.Router();

const TITLE = "Materiais do Laboratório";

router.get("/materiais", (req, res, next) => {
    res.render("material", { title: TITLE });
});

router.post("/materiais", (req, res, next) => {
    res.render("material", { title: TITLE });
});

module.exports = router;
