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

document.querySelector('#observacoes').value = '';

const tipoMaterial = document.querySelector('#tipo-material');

tipoMaterial.addEventListener('change', (evento) => {
    for (let i = 0; i < tipoMaterial.length; i++) {
        const capacidade = document.querySelector('#capacidade');
        const programas = document.getElementsByClassName('n-programa');

        if (!tipoMaterial[0].selected) {

            capacidade.disabled = true;
            for (let i = 0; i < programas.length; i++) {
                programas[i].disabled = true;
            }
            break;
        } else {

            capacidade.disabled = false;
            for (let i = 0; i < programas.length; i++) {
                programas[i].disabled = false;
            }
            break;
        }
    }
});

//editar mostrar as info

document.querySelectorAll('.btn-editar').forEach(botao => {
    botao.addEventListener('click', () => {
        const materialId = botao.dataset.materialId;
        document.querySelector('#edit-material-id').value = materialId;

        fetch('/materiais/' + materialId, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {

                data.forEach(dados => {
                    document.querySelector('#edit-nome-material').value = dados.nome;
                })
            })
            .catch(error => {
                console.log('Ocorreu um erro:', error.message);
            });

    });
});


