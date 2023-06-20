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


//pega dados para editar
async function getDadosForEdition(botao) {
    const materialId = botao.dataset.materialId;
    document.querySelector('#edit-material-id').value = materialId;
    let newBody = {};

    await fetch('/materiais/' + materialId, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {

            data.forEach(dados => {
                const nome = document.querySelector('#edit-nome-material').value = dados.nome;
                const marca = document.querySelector('#edit-marca-material').value = dados.marca;
                const modelo = document.querySelector('#edit-modelo-material').value = dados.modelo;
                const editTipoMaterial = document.querySelector('#edit-tipo-material');
                let tipo;
                let estado;
                let temPograma;
                let mesa;

                for (let i = 0; i < editTipoMaterial.length; i++) {

                    if (editTipoMaterial[i].value == dados.tipo_material) {
                        editTipoMaterial[i].selected = true;
                        tipo = editTipoMaterial[i].value;
                    }
                }

                const radioEstado = document.querySelectorAll('input[data-edit-radio=edit-estado]');
                radioEstado.forEach((radio) => {
                    if (radio.value.toLowerCase() == dados.estado.toLowerCase()) {
                        radio.checked = true;
                        estado = radio;
                    }
                });

                const capacidade = document.querySelector('#edit-capacidade').value = dados.capacidade;
                const radioPrograma = document.querySelectorAll('input[data-edit-programas=edit-programas]');
                radioPrograma.forEach(programa => {
                    if (programa.value.toLowerCase() == dados.tem_programas.toLowerCase()) {
                        programa.checked = true;
                        temPograma = programa;
                    }
                });

                const dataCompra = document.querySelector('#edit-data-compra').value = dados.data_compra.substring(0, 10);
                const editMesa = document.querySelector('#edit-mesa');
                for (let i = 0; i < editMesa.length; i++) {
                    if (editMesa[i].value == dados.mesa) {
                        editMesa[i].selected = true;
                        mesa = editMesa[i];
                    }
                }

                const observacoes = document.querySelector('#edit-observacoes').value = dados.observacoes;

                newBody = {
                    nome: nome,
                    marca: marca,
                    modelo: modelo,
                    tipo_material: tipo,
                    estado: estado,
                    data_compra: dataCompra,
                    capacidade: capacidade,
                    tem_programas: temPograma,
                    mesa: mesa,
                    observacoes: observacoes
                }
            });
        })
        .catch(error => {
            console.log('Ocorreu um erro:', error.message);
        });

    //updateRegisto(materialId, newBody);
}

async function updateRegisto(id, body) {

    try {
        const response = fetch('/materiais/' + id, {
            method: 'PUT',
            body: JSON.stringify(body)
        });

        const data = (await response).json();
    } catch (erro) {
        console.log("Ocorreu um erro ao actualizar " + erro.message);
    }

}
//editar mostrar as info
document.querySelectorAll('.btn-editar').forEach(botao => {
    botao.addEventListener('click', getDadosForEdition(botao));
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

btnLimparTudo.addEventListener('click', () => {
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

                showDeleteAllMessage();

            })
            .catch(error => {
                console.log('Ocorreu um erro:', error.message);
            });
    });
});

//Criar Novo material
/*
const formularioDados = document.querySelector('.form-cadastro');
formularioDados.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(formularioDados);//verificar os dados daqui
    console.log(JSON.parse(data));

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
});*/

async function getMateriais() {
    try {
        const response = await fetch('/materiais/listar');
        const data = await response.json();
        /*

        data.forEach(material => {
            const tbody = document.querySelector('.grid-body');

            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');
            const td6 = document.createElement('td');
            const td7 = document.createElement('td');
            const td8 = document.createElement('td');

            const ActionList = document.createElement('span');

            const linkVer = document.createElement('a');
            const linkEditar = document.createElement('a');
            const iconeVer = document.createElement('i');
            const iconeEditar = document.createElement('i');

            td1.innerText = material.nome;
            td2.innerText = material.marca;
            td3.innerText = material.modelo;
            td4.innerText = material.mesa;
            td5.innerText = material.capacidade;
            td6.innerText = material.tem_programas;
            td7.innerText = material.estado;

            ActionList.classList.add('actions-list');
            linkVer.classList.add('btn-ver');
            linkVer.setAttribute('href', '#');
            linkVer.id = 'btnVer';
            linkVer.setAttribute('title', 'Visualizar Registo');
            iconeVer.className = 'fa fa-eye';

            linkEditar.classList.add('btn-editar');
            linkEditar.setAttribute('title', 'Editar Registo');
            linkEditar.setAttribute('data-material-id', material.id);
            linkEditar.setAttribute('href', '#');

            iconeEditar.className = 'fa fa-edit';

            td1.classList.add('grid-data');
            td2.classList.add('grid-data');
            td3.classList.add('grid-data');
            td4.classList.add('grid-data');
            td5.classList.add('grid-data');
            td6.classList.add('grid-data');
            td7.classList.add('grid-data');
            td8.classList.add('grid-data');

            td8.appendChild(ActionList);

            ActionList.appendChild(linkVer);
            ActionList.appendChild(linkEditar);

            linkVer.appendChild(iconeVer);
            linkEditar.appendChild(iconeEditar);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);
            tr.appendChild(td8);
            tbody.appendChild(tr);

        });*/
    } catch (erro) {
        console.log("Houve um erro " + erro);
    }
}

getMateriais();