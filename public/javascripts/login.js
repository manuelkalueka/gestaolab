function validarSenha() {
    const userNameElement = document.querySelector('#username');
    const senhaElement = document.querySelector('#senha');
    const alerMessage = document.getElementsByClassName('message-alert')[0];

    let username = userNameElement.value;
    let senha = senhaElement.value;

<<<<<<< HEAD
    const message = { err: 'Verifique os dados de acesso...', success: 'Dados aceito' };

=======
>>>>>>> 6a8cdc1df8a08b48d15883c9ef367d7fc83910d9
    if (username == '' || senha == '') {
        event.preventDefault();

        alerMessage.classList.remove('hide');
        alerMessage.classList.add('alert-err')

        userNameElement.focus();
        return;
    } else {
        alerMessage.classList.remove('hide');
        alerMessage.classList.add('alert-success');
<<<<<<< HEAD
        alerMessage.textContent = message.success;
=======
>>>>>>> 6a8cdc1df8a08b48d15883c9ef367d7fc83910d9
    }
}

document.querySelector('#senha').addEventListener('focus', () => {
    document.getElementsByClassName('message-alert')[0].classList.add('hide');
});

document.querySelector('#username').addEventListener('blur', () => {
    document.getElementsByClassName('message-alert')[0].classList.add('hide');
});

const btnEntrar = document.querySelector('#btnEntrar');
btnEntrar.addEventListener('click', validarSenha);

document.getElementsByTagName('body').addEventListener('load', ()=> {
    document.querySelector('#username').focus();
});