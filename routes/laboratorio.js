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

    res.render("laboratorio", {
      title: "Visão Geral sobre os Laboratórios",
      sessao: req.session,
      usuario: req.user,
      laboratorios,
      laboratorioSelecionado: getSelectedLab(),
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

router.get("/laboratorios/resume/:id", async (req, res) => {
  try {
    const id = req.params.id;//pega o id do laboratorio
    // Função para obter os totais de um laboratório
    async function obterTotaisLab(id) {
      const [total_mesas] = await database("mesas")
        .where({ laboratorio: id })
        .count("*", { as: "total_mesas" });
      const [total_mesa_cheia] = await database("mesas")
        .where({ laboratorio: id, estado: "Cheia" })
        .count("*", { as: "total_mesa_cheia" });
      const [total_mesa_com_espaco] = await database("mesas")
        .where({ laboratorio: id, estado: "Espaço Livre" || "Vazia"})
        .count("*", { as: "total_mesa_com_espaco" });

      const [total_materiais_avariados] = await database("materiais")
        .where({ estado: "danificado", laboratorio: id })
        .count("*", { as: "total_materiais_avariados" });
      const [total_materiais_incompleto] = await database("materiais")
        .where({ estado: "rasoavel", laboratorio: id })
        .count("*", { as: "total_materiais_incompleto" });
      const [total_materiais] = await database("materiais")
        .where({ laboratorio: id })
        .count("*", { as: "total_materiais" });
      const [total_materiais_bons] = await database("materiais")
        .where({ estado: "Bom", laboratorio: id })
        .count("*", { as: "total_materiais_bons" });

      return {//retorna os totais
        total_mesas,
        total_mesa_cheia,
        total_mesa_com_espaco,
        total_materiais,
        total_materiais_bons,
        total_materiais_avariados,
        total_materiais_incompleto,
      };
    }

    // Para cada laboratório, cria o total para ele
    const resultado = await obterTotaisLab(id); // Obtem os totais de um laboratório
    return res.json(resultado);
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
