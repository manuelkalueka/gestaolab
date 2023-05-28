function validarSenha() {
    const userNameElement = document.querySelector('#username');
    const senhaElement = document.querySelector('#senha');
    const alertMessage = document.getElementsByClassName('message-alert')[0];

    let username = userNameElement.value;
    let senha = senhaElement.value;

    if (username == '' || senha == '') {
        event.preventDefault();

        alertMessage.classList.remove('hide');
        alertMessage.classList.add('alert-err')

        userNameElement.focus();
        return;
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

document.getElementsByTagName('body').addEventListener('load', () => {
    document.querySelector('#username').focus();
});