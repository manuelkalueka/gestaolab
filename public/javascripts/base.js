const formValidate = document.querySelector('#form-validate');
if (formValidate) {
  formValidate.addEventListener('submit', (evento) => {
    const nome = document.getElementById('nome-material');
    const capacidade = document.getElementById('capacidade');
    const estado = document.getElementsByName('estado');
    const tipoMaterial = document.querySelector('#tipo-material');

    if (tipoMaterial[0].selected) {

      if (nome.value === '' || capacidade.value == '') {
        evento.preventDefault();
        const msgContainer = document.querySelector('.message-alert');
        msgContainer.classList.add('alert-err');
        msgContainer.classList.remove('hide');
        document.querySelector('#msg').textContent = 'Preecha todos os campos correctamente!';
        nome.focus();
        return;
      }
    } else {

      if (nome.value === '') {
        evento.preventDefault();
        const msgContainer = document.querySelector('.message-alert');
        msgContainer.classList.add('alert-err');
        msgContainer.classList.remove('hide');
        document.querySelector('#msg').textContent = 'Preecha todos os campos correctamente!';
        nome.focus();
        return;
      }
    }

  })
}

document.querySelector('#btn-novo').addEventListener('click', () => {
  const modalNovo = document.querySelector('#modal-novo');

  modalNovo.classList.add('is-active');

  modalNovo.addEventListener('click', (evento) => {
    if (evento.target.id == 'close' || evento.target.id == 'modal-novo') {
      modalNovo.classList.remove('is-active');
    }
  });
});

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

// function excluirRegisto(id) {
//   const resposta = confirm("Tens a certeza que deseja excluir este Regisito ?");
//   const rota = window.location.pathname;

//   if (resposta) {
//     const form = document.createElement('form');
//     form.setAttribute('method', 'post');
//     form.setAttribute('action', + '/materiais/' + id);

//     const deleteInput = document.createElement('input');
//     deleteInput.setAttribute('type', 'hidden');
//     deleteInput.setAttribute('name', '_method');
//     deleteInput.setAttribute('value', 'delete');

//     form.appendChild(deleteInput);
//     document.body.appendChild(form);
//     form.submit();
//   }
// }

document.querySelectorAll('.deleteRegisto').forEach(deleteRegisto => {
  deleteRegisto.addEventListener('submit', (evento) => {
    const resposta = confirm("Tens a certeza que deseja excluir este Registo?");
    if (!resposta) {
      evento.preventDefault();
    }
  });
})

//Abrir Editar elemento
document.querySelectorAll('.btn-editar').forEach(btnEditar => {
  btnEditar.addEventListener('click', abrirModalEditar);
});

// //Excluir elemento Editar elemento
// document.querySelectorAll('.btn-excluir').forEach(btnExcluir => {
//   btnExcluir.addEventListener('click', excluirRegisto);
// })

//Ver registo do material
document.querySelectorAll('.btn-ver').forEach(btnVer => {
  btnVer.addEventListener('click', abrirModalVer);
});


//.addEventListener('click', (evento) => {
//   if (!) {
//     evento.preventDefault();
//     return;
//   }
// });
