/*

function validarMaterial() {
    const nomeElement = document.querySelector('#nome');
    const marcaElemnt = document.querySelector('#marca');
    const modeloElemnt = document.querySelector('#modelo');
    const tipoMaterialElemnt = document.querySelector('#tipo-material');
    const dataCompraElement = document.querySelector('#data-compra');
    const estadoElement = document.querySelector('#estado-material');
    const capacidadeElement = document.querySelector('#capacidade');
    const temProgramaElement = document.querySelectorAll('tem_programas');

    const mesaElement = document.querySelector('#mesa');
    const observacoes = document.querySelector('#observacoes');

    if (nomeElement.value == '' || nomeElement.value == null) {
        nomeElement.focus();
        nomeElement.style.outline = '1px solid red';
        return;
    }

    alert('nome invalido');
}

document.querySelector('#btnCadastrar').addEventListener('click', validarMaterial()); //ToDo */

//Ativa o input modelo
document.querySelector('#marca-material').addEventListener('blur', (evento) => {
    const modeloElemnt = document.querySelector('#modelo-material')
    modeloElemnt.disabled = false;
});