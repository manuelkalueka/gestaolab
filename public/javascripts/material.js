const formValidate = document.querySelector('#form-validate');
const editFormValidate = document.querySelector('#edit-form-validate');

if (formValidate) {
    formValidate.addEventListener('submit', (evento) => {
        const nome = document.getElementById('nome-material');
        const capacidade = document.getElementById('capacidade');
        const estados = document.querySelectorAll('.n-estado');
        const tipoMaterial = document.querySelector('#tipo-material');
        const observacoes = document.querySelector('#observacoes');

        if (tipoMaterial[0].selected) {

            if (nome.value === '') {
                evento.preventDefault();
                const msgContainer = document.querySelector('.message-alert');
                msgContainer.classList.add('alert-err');
                msgContainer.classList.remove('hide');
                document.querySelector('#msg').textContent = 'Preecha o campo Nome';
                nome.focus();
                return;
            }

            if (capacidade.value == '') {
                evento.preventDefault();
                const msgContainer = document.querySelector('.message-alert');
                msgContainer.classList.add('alert-err');
                msgContainer.classList.remove('hide');
                document.querySelector('#msg').textContent = 'Preecha o campo Capacidades do Computador';
                capacidade.focus();
                return;
            }

            estados.forEach(estado => {
                if (estado.checked) {
                    if ((estado.value == 'Danificado' || estado.value == 'Rasoável') && observacoes.value == '') {
                        evento.preventDefault();
                        const msgContainer = document.querySelector('.message-alert');
                        msgContainer.classList.add('alert-err');
                        msgContainer.classList.remove('hide');
                        document.querySelector('#msg').textContent = 'Descreve o problema nas Observações!';
                        observacoes.focus();
                        return;
                    }
                }
            });
        } else {

            if (nome.value === '') {
                evento.preventDefault();
                const msgContainer = document.querySelector('.message-alert');
                msgContainer.classList.add('alert-err');
                msgContainer.classList.remove('hide');
                document.querySelector('#msg').textContent = 'Preecha o campo Nome';
                nome.focus();
                return;
            }

            estados.forEach(estado => {
                if (estado.checked) {
                    if ((estado.value == 'Danificado' || estado.value == 'Rasoável') && observacoes.value == '') {
                        evento.preventDefault();
                        const msgContainer = document.querySelector('.message-alert');
                        msgContainer.classList.add('alert-err');
                        msgContainer.classList.remove('hide');
                        document.querySelector('#msg').textContent = 'Descreve o problema nas observações!';
                        observacoes.focus();
                        return;
                    }
                }
            });
        }

    })
}

//PARA O FORMULARIO EDITAR
if (editFormValidate) {
    editFormValidate.addEventListener('submit', (evento) => {
        const nome = document.querySelector('#edit-nome-material');
        const capacidade = document.getElementById('edit-capacidade');
        const estados = document.querySelectorAll('.edit-estado');
        const tipoMaterial = document.querySelector('#edit-tipo-material');
        const observacoes = document.querySelector('#edit-observacoes');

        if (tipoMaterial[0].selected) {

            if (nome.value == '') {
                evento.preventDefault();
                const msgContainer = document.querySelectorAll('.message-alert')[1];
                msgContainer.classList.add('alert-err');
                msgContainer.classList.remove('hide');
                document.querySelector('#edit-msg').textContent = 'Preecha o campo Nome';
                nome.focus();
                return;
            }

            if (capacidade.value == '') {
                evento.preventDefault();
                const msgContainer = document.querySelectorAll('.message-alert')[1];
                msgContainer.classList.add('alert-err');
                msgContainer.classList.remove('hide');
                document.querySelector('#edit-msg').textContent = 'Preecha o campo Capacidades do Computador';
                capacidade.focus();
                return;
            }

            estados.forEach(estado => {
                if (estado.checked) {
                    if ((estado.value == 'Danificado' || estado.value == 'Rasoável') && observacoes.value == '') {
                        evento.preventDefault();
                        const msgContainer = document.querySelectorAll('.message-alert')[1];
                        msgContainer.classList.add('alert-err');
                        msgContainer.classList.remove('hide');
                        document.querySelector('#edit-msg').textContent = 'Descreve o problema nas Observações!';
                        observacoes.focus();
                        return;
                    }
                }
            });
        } else {

            if (nome.value === '') {
                evento.preventDefault();
                const msgContainer = document.querySelectorAll('.message-alert')[1];
                msgContainer.classList.add('alert-err');
                msgContainer.classList.remove('hide');
                document.querySelector('#edit-msg').textContent = 'Preecha o campo Nome';
                nome.focus();
                return;
            }

            estados.forEach(estado => {
                if (estado.checked) {
                    if ((estado.value == 'Danificado' || estado.value == 'Rasoável') && observacoes.value == '') {
                        evento.preventDefault();
                        const msgContainer = document.querySelector('.message-alert');
                        msgContainer.classList.add('alert-err');
                        msgContainer.classList.remove('hide');
                        document.querySelector('#msg').textContent = 'Descreve o problema nas observações!';
                        observacoes.focus();
                        return;
                    }
                }
            });
        }

    })
}

//Ativa o input modelo
document.querySelector('#marca-material').addEventListener('blur', (evento) => {
    const modeloElemnt = document.querySelector('#modelo-material')
    modeloElemnt.disabled = false;
});

document.querySelector('#observacoes').value = '';


function novoEstadoTipoMaterial() {
    const tipoMaterial = document.querySelector('#tipo-material');

    tipoMaterial.addEventListener('change', (evento) => {
        for (let i = 0; i < tipoMaterial.length; i++) {
            const capacidade = document.querySelector('#capacidade');
            const programas = document.getElementsByClassName('n-programa');

            if (!tipoMaterial[0].selected) {

                capacidade.value = '';
                capacidade.disabled = true;
                for (let i = 0; i < programas.length; i++) {
                    const naoTemPrograma = document.querySelector('#rd-nao');
                    naoTemPrograma.checked = true;
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
}

function ediEstadoTipoMaterial() {

    const editTipoMaterial = document.querySelector('#edit-tipo-material');
    editTipoMaterial.addEventListener('change', (evento) => {
        for (let i = 0; i < editTipoMaterial.length; i++) {
            const capacidade = document.querySelector('#edit-capacidade');
            const programas = document.getElementsByClassName('edit-programa');

            if (!editTipoMaterial[0].selected) {

                capacidade.value = '';
                capacidade.disabled = true;
                for (let i = 0; i < programas.length; i++) {
                    const naoTemPrograma = document.querySelector('#edit-rd-nao');
                    naoTemPrograma.checked = true;
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
}

novoEstadoTipoMaterial();
ediEstadoTipoMaterial();

//pega dados para editar
async function getDadosForEdition(id) {
    const materialId = id;
    document.querySelector('#edit-material-id').value = materialId;
    // let newBody = {};

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

                // newBody = {
                //     nome: nome,
                //     marca: marca,
                //     modelo: modelo,
                //     tipo_material: tipo,
                //     estado: estado,
                //     data_compra: dataCompra,
                //     capacidade: capacidade,
                //     tem_programas: temPograma,
                //     mesa: mesa,
                //     observacoes: observacoes
                // }

                SalvarEdicao(materialId);
            });
        })
        .catch(error => {
            console.log('Ocorreu um erro:', error.message);
        });

    //updateRegisto(materialId, newBody);
}

// async function updateRegisto(id, body) {

//     try {
//         const response = fetch('/materiais/' + id, {
//             method: 'PUT',
//             body: JSON.stringify(body)
//         });

//         const data = (await response).json();
//     } catch (erro) {
//         console.log("Ocorreu um erro ao actualizar " + erro.message);
//     }

// }

//pega dados para ver
async function getMaterial(id) {
    try {
        const materialId = id;

        const response = await fetch('/materiais/' + materialId);//pega os dados para editar
        const data = await response.json();

        await data.forEach((material) => {
            let tipoMaterial = [{ pc: "Computador", key: "Teclado", mo: "Mouse", oth: "Outro", up: "UPS" }];
            document.querySelector('.modal-card-title.ver-nome').innerHTML = material.nome;
            document.querySelector('.ver-marca-material').innerHTML = material.marca;
            document.querySelector('.ver-modelo-material').innerHTML = material.modelo;
            const verTipo = document.querySelector('.ver-tipo-material');
            tipoMaterial.forEach(tipo => {
                if ("pc" == material.tipo_material) {
                    verTipo.innerHTML = tipo.pc;
                }
                if ("key" == material.tipo_material) {
                    verTipo.innerHTML = tipo.key;
                }
                if ("mo" == material.tipo_material) {
                    verTipo.innerHTML = tipo.mo;
                }
                if ("up" == material.tipo_material) {
                    verTipo.innerHTML = tipo.up;
                }
                if ("oth" == material.tipo_material) {
                    verTipo.innerHTML = tipo.oth;
                }
            })
            document.querySelector('.ver-estado').innerHTML = material.estado;

            document.querySelector('.ver-capacidade').innerHTML = material.capacidade;
            document.querySelector('.ver-programas').innerHTML = material.tem_programas;
            document.querySelector('.ver-data-compra').innerHTML = moment(material.data_compra.substring(0, 10)).format('DD-MM-YYYY');
            document.querySelector('.ver-observacoes').innerHTML = material.observacoes;
        })
    }
    catch (erro) {
        console.log("Houve um erro " + erro.message);
    }
}

//editar mostrar as info
// document.querySelectorAll('.btn-editar').forEach(botao => {
//     botao.addEventListener('click', getDadosForEdition(botao));
// });

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
    formDeleteAll.addEventListener('submit', async (evento) => {
        if (!confirmacao) {
            evento.preventDefault();
            return;
        }

        if (!confirm("Tens Certeza?")) {
            evento.preventDefault();
            return;
        }

       await fetch('/materiais', {
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

function SalvarEdicao(id) {
    const formEditar = document.querySelector('.form-edit');
    formEditar.setAttribute('action', '/materiais/' + id);
}

// getMateriais();