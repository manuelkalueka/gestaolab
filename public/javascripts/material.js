function abrirModalNovo() {
    const modalNovo = document.querySelector('#modal-novo-material');

    modalNovo.classList.add('is-active');

    modalNovo.addEventListener('click', (evento) => {
        if (evento.target.id == 'close' || evento.target.id == 'modal-novo-material') {
            modalNovo.classList.remove('is-active');
        }
    });
}

const btnNovo = document.querySelector('#btn-novo');
btnNovo.addEventListener('click', abrirModalNovo);