const formUserValidate = document.querySelector('#form-validate');

if (formUserValidate) {
    formUserValidate.addEventListener('submit', (evento) => {
        const nomeCompleto = document.querySelector('#nome-completo');
        const username = document.querySelector('#username-add');
        const password = document.querySelector('#password');
        const confPassword = document.querySelector('#conf-password');

        if (nomeCompleto.value == '' || nomeCompleto.indexOf(' ') == -1) {
            alert("informe um nome completo");
            nomeCompleto.focus();
            nomeCompleto.style.outline = '1px solid red';
            evento.preventDefault();
            return;
        }
        if (password.value.length < 4 || password.value == '') {
            alert('Preecha uma senha valida com mais de 4 digitos');
            password.focus();
            evento.preventDefault();
            return;
        }
        if (confPasswordpassword.value !== password.value) {
            alert("campo senha e confirmar senha devem ser iguais");
            password.focus();
            evento.preventDefault();
            return;
        }

        /*
        if (username.value == '' || username.value == username.value.upperCase()) {
            alert("Preecha o username correctamente, em minusculo");
            username.focus();
            evento.preventDefault();
            return;
        }*/

    });
}
