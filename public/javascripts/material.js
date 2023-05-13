function abrirModalNovo() {
    const modalNovo = document.querySelector('#modal-novo-material');

    modalNovo.classList.add('is-active');

    modalNovo.addEventListener('click', (evento) => {
        if (evento.target.id == 'close' || evento.target.id == 'modal-novo-material') {
            modalNovo.classList.remove('is-active');
        }
    });
}

function abrirModalEditar() {
    const modalEditar = document.querySelector('#modal-editar-material');

    modalEditar.classList.add('is-active');

    modalEditar.addEventListener('click', (evento) => {
        if (evento.target.id == 'close' || evento.target.id == 'modal-editar-material') {
            modalEditar.classList.remove('is-active');
        }
    });
}

function excluirRegisto() {
    confirm("Tens a certeza que deseja excluir o <MATERIAL?>");
}

function excluirTodosRegistos() {
    confirm("Esta acção apagará todos os registos, Confirmar?");
}

const btnNovo = document.querySelector('#btn-novo');
btnNovo.addEventListener('click', abrirModalNovo);


const btnEditar = document.querySelector('#btnEditar');
btnEditar.addEventListener('click', abrirModalEditar);

document.querySelector('#btnExcluir').addEventListener('click', excluirRegisto);
document.querySelector('#btnLimparGrid').addEventListener('click', excluirTodosRegistos);