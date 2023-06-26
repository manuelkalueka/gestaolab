function validarSenha() {
    const userNameElement = document.querySelector('#username');
    const senhaElement = document.querySelector('#password');
    const alertMessage = document.getElementsByClassName('message-error')[0];

    let username = userNameElement.value;
    let senha = senhaElement.value;

    if (username == '' || senha == '') {
        event.preventDefault();

        userNameElement.focus();
        return;
    }
}

document.querySelector('#password').addEventListener('focus', () => {
    document.getElementsByClassName('message-error')[0].classList.add('hide');
});

document.querySelector('#username').addEventListener('blur', () => {
    document.getElementsByClassName('message-error')[0].classList.add('hide');
});

const btnEntrar = document.querySelector('#btnEntrar');
btnEntrar.addEventListener('click', validarSenha);

document.querySelector('.btnFogSenha').addEventListener('click', () => {
    alert("Para repor sua senha contacte o Administrador do Sistema!");
    return;
})