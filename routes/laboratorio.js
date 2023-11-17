const express = require("express");
const router = express.Router();
const database = require("../database");
const {
  labMiddleware,
  setSelectedLab,
  getSelectedLab,
} = require("../middlewares/laboratorio");

router.use(labMiddleware); // usa o middleware antes de todas as outras rotas

router.get("/laboratorios", async (req, res) => {
  try {
    const laboratorios = await database("laboratorios").where(
      "responsavel",
      req.user.id
    );
    //Mesas
    const total_mesas = await database("mesas")
      .count("*", { as: "total_mesas" });
      console.log(total_mesas);
    //

    /*
      ------------ Materiais ------------------------------
    */

    const [materiais_avariados] = await database("materiais")
      .where({ estado: "Danificado" })
      .count("*", { as: "total_materiais_avariados" });

    const [materiais_incompleto] = await database("materiais")
      .where({ tipo_material: "materiais", estado: "Rasoável" })
      .count("*", { as: "total_materiais_incompleto" });

    const [total_materiais] = await database("materiais")
      .count("*", { as: "total_materiais" });

    const [materiais_bons] = await database("materiais")
      .where({ tipo_material: "materiais", estado: "Bom" })
      .count("*", { as: "total_materiais_bons" });
        /*
      -----------------------------------------
    */

    res.render("laboratorio", {
      title: "Visão Geral sobre os Laboratórios",
      sessao: req.session,
      usuario: req.user,
      laboratorios,
      total_mesas,
      laboratorioSelecionado:getSelectedLab()
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/laboratorios/close", (req, res) => {
  //ToDo Eliminar o laboratorio na Selecao, para assim evitar voltar sem logar novamente
  res.redirect("/laboratorios");
});

router.get("/laboratorios/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await database("laboratorios").where("id", id);
    if (!result) {
      res.send(400);
    } else {
      return res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/laboratorios", async (req, res) => {
  try {
    const { laboratorioId } = req.body;
    setSelectedLab(laboratorioId);
    res.redirect("/dashboard/" + laboratorioId);
  } catch (error) {
    console.log(error);
  }
});

router.post("/laboratorios/cadastrar", async (req, res) => {
  try {
    await database("laboratorios").insert(req.body);
    res.redirect("/laboratorios");
  } catch (error) {
    console.log(error);
  }
});

router.put("/laboratorios/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await database("laboratorios")
      .where("id", id)
      .update(req.body);

    if (result == 0) {
      return res.send(400);
    }
    res.redirect("/laboratorios");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
