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
                    document.querySelector('#edit-marca-material').value = dados.marca;
                    document.querySelector('#edit-modelo-material').value = dados.modelo;
                    const editTipoMaterial = document.querySelector('#edit-tipo-material');

                    for (let i = 0; i < editTipoMaterial.length; i++) {
                        if (editTipoMaterial[i].value == dados.tipo_material) {
                            editTipoMaterial[i].selected = true;
                        }
                    }

                    const radioEstado = document.querySelectorAll('input[data-edit-radio=edit-estado]');
                    radioEstado.forEach((radio) => {
                        if (radio.value.toLowerCase() == dados.estado.toLowerCase()) {
                            radio.checked = true;
                        }
                    });

                    document.querySelector('#edit-capacidade').value = dados.capacidade;
                    const radioPrograma = document.querySelectorAll('input[data-edit-programas=edit-programas]');
                    radioPrograma.forEach(programa => {
                        if (programa.value.toLowerCase() == dados.tem_programas.toLowerCase()) {
                            programa.checked = true;
                        }
                    });

                    document.querySelector('#edit-data-compra').value = dados.data_compra.substring(0, 10);
                    const editMesa = document.querySelector('#edit-mesa');
                    for (let i = 0; i < editMesa.length; i++) {
                        if (editMesa[i].value == dados.mesa) {
                            editMesa[i].selected = true;
                        }
                    }

                    document.querySelector('#edit-observacoes').value = dados.observacoes;
                });
            })
            .catch(error => {
                console.log('Ocorreu um erro:', error.message);
            });

        fetch('/materiais/' + materialId, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                document.querySelector('#form-edit').addEventListener('submit', (evento) => {

                    evento.preventDefault();
                    console.log("Cai aqui");
                    const modalEditar = document.querySelector('#modal-editar');
                    modalEditar.classList.remove('is-active');
                })
            })
    });
});

//mensagem de delete all
function showDeleteAllMessage() {
    const message = document.querySelector('#message');
    const messageBox = document.querySelector('.message-box');

    const messages = localStorage.getItem('messages').split(';');
    messageBox.classList.remove('oculto');
    message.innerHTML = messages[0];

    localStorage.removeItem('messages');
}

// //Excluir todos
const btnLimparTudo = document.querySelector('#btnLimparGrid');
const formDeleteAll = document.querySelector('#form-deleteAll');

btnLimparTudo.addEventListener('click', (evento) => {
    const confirmacao = confirm("Esta acção apagará todos os registos, Confirmar?");
    formDeleteAll.addEventListener('submit', (evento) => {
        if (!confirmacao) {
            evento.preventDefault();
            return;
        }

        if (!confirm("Tens Certeza?")) {
            evento.preventDefault();
            return;
        }

        fetch('/materiais', {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('messages', data.sucesso + ";" + data.falha);
                window.location.reload();

                showDeleteAllMessage();

            })
            .catch(error => {
                console.log('Ocorreu um erro:', error.message);
            });
    });
});

const formularioDados = document.querySelector('.form-dados');
formularioDados.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(formularioDados);

    fetch('/materiais/cadastrar', {
        method: 'POST',
        body: data,
    })
        .then((response) => response.json())
        .then((result) => {
            
        })
        .catch((erro) => {
            console.log(erro);
        })
})