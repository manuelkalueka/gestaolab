function abrirModal(idModal, targetButton) {
  targetButton = document.querySelector("#" + idModal);

  targetButton.classList.add("is-active");

  targetButton.addEventListener("click", (evento) => {
    if (evento.target.id == "close" || evento.target.id == idModal) {
      targetButton.classList.remove("is-active");
    }
  });
}

//Abrir Editar Laboratório
document.querySelectorAll(".btn-editar").forEach((btnEditar) => {
  btnEditar.addEventListener("click", () => {
    abrirModal("modal-editar", btnEditar);
  });
});

// Mostra o Modal Ver Resumo e Coloca Titulo no Modal
document.querySelectorAll(".btn-resumo").forEach((btnResumo, posicao) => {
  btnResumo.addEventListener("click", () => {
    abrirModal("modal-resumo", btnResumo);
    //Colocar Titulo
    const nomeLaboratorio =
      document.querySelectorAll(".card-header-title")[posicao].innerText;
    document.querySelectorAll(".modal-card-title")[1].textContent =
      "Resumo para " + nomeLaboratorio;
  });
});

//pega dados para editar
async function getDadosForEdition(id) {
  const laboratorioId = id;
  document.querySelector("#edit-lab-id").value = laboratorioId;

  try {
    const response = await fetch("/laboratorios/" + laboratorioId);
    const data = await response.json();
    console.log(data);

    data.forEach((lab) => {
      document.querySelector("#edit-nome").value = lab.nome;
      document.querySelector("#edit-descricao").value = lab.descricao;
    });

    SalvarEdicaoLab(laboratorioId);
  } catch (error) {
    console.log("Ocorreu um erro:", error);
  }
}

function SalvarEdicaoLab(id) {
  //Manda os dados para rota PUT para salvar na BD
  document
    .querySelector("#edit-form-validate-lab")
    .setAttribute("action", "/laboratorios/" + id);
}

async function showResume(laboratorioId) {
  //Mostra os totais do laboratorio vindo da rota /laboratorios/resume/:id para o modal
  const url = "/laboratorios/resume/" + laboratorioId;
  const response = await fetch(url);
  const totais = await response.json();
  setTotalsToModal(totais);
}

function setTotalsToModal(totais) {
  document.querySelectorAll(".item-content")[0].textContent =
    totais.total_mesas.total_mesas; //seta os totais da mesa
  document.querySelectorAll(".item-content")[1].textContent =
    totais.total_mesa_cheia.total_mesa_cheia;
  document.querySelectorAll(".item-content")[2].textContent = Number(
    totais.total_mesa_com_espaco.total_mesa_com_espaco +
      totais.total_mesa_vazia.total_mesa_vazia
  );
  document.querySelectorAll(".item-content")[3].textContent =
    totais.total_materiais.total_materiais;
  document.querySelectorAll(".item-content")[4].textContent =
    totais.total_materiais_bons.total_materiais_bons;
  document.querySelectorAll(".item-content")[5].textContent =
    totais.total_materiais_avariados.total_materiais_avariados;
  document.querySelectorAll(".item-content")[6].textContent =
    totais.total_materiais_incompleto.total_materiais_incompleto;
}
