const formUserValidate = document.querySelector('#form-validate');

if (formUserValidate) {
    formUserValidate.addEventListener('submit', (evento) => {
        const nomeCompleto = document.querySelector('#nome-completo');
        const username = document.querySelector('#username-add');
        const password = document.querySelector('#password');
        const confPassword = document.querySelector('#conf-password');
        const bi = document.querySelector('#bi');
        const genero = document.querySelector('#genero');
        const nomeSemEspaco = nomeCompleto.value.trim();

        if (nomeCompleto.value == '' || nomeSemEspaco.indexOf(' ') == -1) {
            alert("informe um nome completo");
            nomeCompleto.focus();
            evento.preventDefault();
            return;
        }

        if (username.value == '') {
            alert("informe um nome de usuario em letras minusculas");
            username.focus();
            evento.preventDefault();
            return;
        }
        if (password.value == '') {
            alert('Preecha uma senha valida');
            password.focus();
            evento.preventDefault();
            return;
        }

        if (password.value.length < 4) {
            alert('Senha muito curta, deve ter no minimo 4 caracteres');
            password.focus();
            evento.preventDefault();
            return;
        }

        if (bi.value == '') {
            alert('Informe um numero de BI ou outro documento válido');
            bi.focus();
            evento.preventDefault();
            return;
        }

        if (bi.value.length < 14) {
            alert('Informe um numero de BI válido, com mais de 14 caracteres');
            bi.focus();
            evento.preventDefault();
            return;
        }
        if (confPassword.value == '') {
            alert("Deve confirmar a senha digitada!");
            confPassword.focus();
            evento.preventDefault();
            return;
        }

        if (confPassword.value != password.value) {
            alert("Os campos senha e confirmar senha devem ser iguais!");
            confPassword.focus();
            evento.preventDefault();
            return;
        }

        for (let i = 0; i < genero.length; i++) {
            if (genero[0].selected) {
                alert("Seleciona um genero");
                genero.focus();
                evento.preventDefault();
                return;
            }
        }

    });
}
