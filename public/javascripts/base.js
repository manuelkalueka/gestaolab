const formValidate = document.querySelector('#form-validate');
if (formValidate) {
  formValidate.addEventListener('submit', (evento) => {
    const nome = document.getElementById('nome-material');
    const capacidade = document.getElementById('capacidade');
    if (nome.value === '' || capacidade.value == '') {
      evento.preventDefault();
      const msgContainer = document.querySelector('.message-alert');
      msgContainer.classList.add('alert-err');
      msgContainer.classList.remove('hide');
      document.querySelector('#msg').textContent = 'Preecha todos os campos correctamente!';
      nome.focus();

      return;
    }
  })
}

function abrirModalNovo() {
  const modalNovo = document.querySelector('#modal-novo');

  modalNovo.classList.add('is-active');

  modalNovo.addEventListener('click', (evento) => {
    if (evento.target.id == 'close' || evento.target.id == 'modal-novo') {
      modalNovo.classList.remove('is-active');
    }
  });
}

function abrirModalEditar() {
  const modalEditar = document.querySelector('#modal-editar');

  modalEditar.classList.add('is-active');

  modalEditar.addEventListener('click', (evento) => {
    if (evento.target.id == 'close' || evento.target.id == 'modal-editar') {
      modalEditar.classList.remove('is-active');
    }
  });
}

function abrirModalVer() {
  const modalNovo = document.querySelector('#modal-ver');

  modalNovo.classList.add('is-active');

  modalNovo.addEventListener('click', (evento) => {
    if (evento.target.id == 'close' || evento.target.id == 'modal-ver') {
      modalNovo.classList.remove('is-active');
    }
  });
}

function excluirRegisto() {
  confirm("Tens a certeza que deseja excluir o <MATERIAL?>");
}

function excluirTodosRegistos() {
  confirm("Esta acção apagará todos os registos, Confirmar?");
}

const btnNovo = document.querySelector('#btn-novo');
btnNovo.addEventListener('click', abrirModalNovo);

//Abrir Editar elemento
document.querySelectorAll('.btn-editar').forEach(btnEditar => {
  btnEditar.addEventListener('click', abrirModalEditar);
});
//Excluir elemento Editar elemento
document.querySelectorAll('.btn-excluir').forEach(btnExcluir => {
  btnExcluir.addEventListener('click', excluirRegisto);
})

//Ver registo do material
document.querySelectorAll('.btn-ver').forEach(btnVer => {
  btnVer.addEventListener('click', abrirModalVer);
})

//Exluir todos
document.querySelector('#btnLimparGrid').addEventListener('click', excluirTodosRegistos);

document.querySelector('#observacoes').value = '';
