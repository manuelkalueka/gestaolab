// const database = require("../database");
let selectedLab = null; //armazena o laboratorio escolhido

exports.setSelectedLab = (lab) => {
  selectedLab = lab;
};

//pega o laboratorio selecionado
exports.getSelectedLab = () => {
  return selectedLab;
};

exports.labMiddleware = (req, res, next) => {
  const { laboratorioId } = req.body;

  selectedLab = laboratorioId;

  next();
};
