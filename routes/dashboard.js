const express = require("express");
const router = express.Router();
const TITULO_PAGE = "Dashboard";
const database = require("../database");
const { getSelectedLab } = require("../middlewares/laboratorio");

router.get("/dashboard", async (req, res) => {
  const laboratorioSelecionado = getSelectedLab();
  res.redirect("/dashboard/" + laboratorioSelecionado);
});

router.get("/dashboard/:idLab", async (req, res, next) => {
  try {
    const { idLab } = req.params;
    const labName = await database("laboratorios")
      .where({ id: idLab })
      .select("nome")
      .first();

    const [mesas] = await database("mesas")
      .where("laboratorio", idLab)
      .count("*", { as: "total_mesas" });

    const [PC] = await database("materiais")
      .where({ tipo_material: "pc", laboratorio: idLab })
      .count("*", { as: "total_pc" });

    const [PC_avariados] = await database("materiais")
      .where({ tipo_material: "pc", estado: "danificado", laboratorio: idLab })
      .count("*", { as: "total_pc_avariados" });

    const [Pc_incompleto] = await database("materiais")
      .where({ tipo_material: "pc", estado: "rasoavel", laboratorio: idLab })
      .count("*", { as: "total_pc_incompleto" });

    const [total_materiais] = await database("materiais")
      .where("laboratorio", idLab)
      .count("*", { as: "total_materiais" });

    const [pc_bons] = await database("materiais")
      .where({ tipo_material: "pc", estado: "Bom", laboratorio: idLab })
      .count("*", { as: "total_pc_bons" });

    const [total_outros] = await database("materiais")
      .where({ laboratorio: idLab })
      .andWhereNot({ tipo_material: "pc" }) // listar Materiais que não são PC
      .count("*", {
        as: "total_outros",
      });

    res.render("dashboard", {
      title: TITULO_PAGE,
      total_mesas: mesas.total_mesas,
      total_pc: PC.total_pc,
      total_pc_avaria: PC_avariados.total_pc_avariados,
      total_pc_incompleto: Pc_incompleto.total_pc_incompleto,
      total_materiais: total_materiais.total_materiais,
      total_pc_bons: pc_bons.total_pc_bons,
      total_outros: total_outros.total_outros,
      sessao: req.session,
      usuario: req.user,
      labName: labName.nome,
    });
  } catch (erro) {
    console.log(erro.message);
  }
});

router.post("/dashboard", (req, res, next) => {
  res.redirect("dashboard");
});

module.exports = router;
