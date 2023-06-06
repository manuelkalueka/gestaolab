const formUserValidate = document.querySelector('#form-validate');

if (formUserValidate) {
    formUserValidate.addEventListener('submit', (evento) => {
        const nomeCompleto = document.querySelector('#nome-completo');

        if (nomeCompleto.value == '' || nomeCompleto.indexOf() == -1) {
            alert("informe um nome completo");
            nomeCompleto.focus();
            nomeCompleto.style.outline= '1px solid red';
            evento.preventDefault();
            return;
        }
    });

}