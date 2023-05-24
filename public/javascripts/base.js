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

document.querySelector('#observacoes').value = '';