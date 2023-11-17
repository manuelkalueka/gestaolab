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
      nomeLaboratorio;
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

function SalvarEdicaoLab(id) {//Manda os dados para rota PUT para salvar na BD
  document
    .querySelector("#edit-form-validate-lab")
    .setAttribute("action", "/laboratorios/" + id);
}
