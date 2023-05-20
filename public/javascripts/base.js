const formValidate = document.querySelector('#form-validate');
if (formValidate) {
    formValidate.addEventListener('submit', (evento) => {
        if (document.querySelector('input').value === '') {
            evento.preventDefault();
            const msgContainer = document.querySelector('.message-alert');
            msgContainer.classList.add('alert-err');
            msgContainer.classList.remove('hide');
            document.querySelector('#msg').textContent = 'Preecha todos os campos!';

            return;
        }
    })

}