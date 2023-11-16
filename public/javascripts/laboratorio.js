//Abrir Editar Laboratório
document.querySelectorAll(".btn-editar").forEach((btnEditar) => {
  btnEditar.addEventListener("click", abrirModalEditar);
});

function abrirModalEditar() {
  const modalEditar = document.querySelector("#modal-editar");

  modalEditar.classList.add("is-active");

  modalEditar.addEventListener("click", (evento) => {
    if (evento.target.id == "close" || evento.target.id == "modal-editar") {
      modalEditar.classList.remove("is-active");
    }
  });
}

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
  document
    .querySelector("#edit-form-validate-lab")
    .setAttribute("action", "/laboratorios/" + id);
}
