function validarSenha() {
    const userNameElement = document.querySelector('#username');
    const senhaElement = document.querySelector('#senha');
    const alerMessage = document.getElementsByClassName('message-alert')[0];

    let username = userNameElement.value;
    let senha = senhaElement.value;

    const message = { err: 'Verifique os dados de acesso...', sucess: 'Dados aceito' };

    if (username == '' || senha == '') {
        event.preventDefault();

        alerMessage.textContent = message.err;
        alerMessage.classList.remove('hide');
        alerMessage.classList.add('alert-err')

        userNameElement.focus();
        return;
    };
}

document.querySelector('#senha').addEventListener('focus', () => {
    document.getElementsByClassName('message-alert')[0].classList.add('hide');
});

document.querySelector('#username').addEventListener('blur', () => {
    document.getElementsByClassName('message-alert')[0].classList.add('hide');
});

const btnEntrar = document.querySelector('#btnEntrar');
btnEntrar.addEventListener('click', validarSenha);