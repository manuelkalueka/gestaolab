// // //Excluir todos
// const btnLimparTudo = document.querySelector('#btnLimparGrid');
// const formDeleteAll = document.querySelector('#form-deleteAll');

// btnLimparTudo.addEventListener('click', () => {
//     const confirmacao = confirm("Esta acção apagará todos os registos, Confirmar?");
//     formDeleteAll.addEventListener('submit', (evento) => {
//         if (!confirmacao) {
//             evento.preventDefault();
//             return;
//         }

//         if (!confirm("Tens Certeza?")) {
//             evento.preventDefault();
//             return;
//         }

//         fetch('/mesas', {
//             method: 'DELETE'
//         })
//             .then(response => response.json())
//             .then(data => {
//                 //Fazer outras configuracoes
//             })
//             .catch(error => {
//                 console.log('Ocorreu um erro:', error.message);
//             });
//     });
// });

//pega dados para ver
async function getMesa(id) {
    try {
        const mesaId = id;

        const response = await fetch('/mesas/' + mesaId);//pega os dados para editar
        const data = await response.json();

        await data.forEach((mesa) => {
            document.querySelector('.modal-card-title.ver-nome').innerHTML = mesa.nome;
            document.querySelector('.ver-numero-max-pc').innerHTML = mesa.num_maximo_pc;
            document.querySelector('.ver-estado').innerHTML = mesa.estado;
        })
    }
    catch (erro) {
        console.log("Houve um erro " + erro.message);
    }
}

//pega dados para editar
async function getDadosForEdition(id) {
    const mesaId = id;
    document.querySelector('#edit-mesa-id').value = mesaId;

    await fetch('/mesas/' + mesaId, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {

            data.forEach(dados => {
                document.querySelector('#edit-nome-mesa').value = dados.nome;
                document.querySelector('#edit-num-max-mesa').value = dados.num_maximo_pc;
                let estado;
                const radioEstado = document.querySelectorAll('.edit-estado-mesa');
                radioEstado.forEach((radio) => {
                    if (radio.value.toLowerCase() == dados.estado.toLowerCase()) {
                        radio.checked = true;
                        estado = radio;
                    }
                });

                SalvarEdicao(mesaId);
            });
        })
        .catch(error => {
            console.log('Ocorreu um erro:', error.message);
        });
}

//Salvar Edicao
function SalvarEdicao(id) {
    const formEditar = document.querySelector('.form-edit');
    formEditar.setAttribute('action', '/mesas/' + id);
}

const formValidate = document.querySelector('#form-validate-mesa');
const editformValidate = document.querySelector('#edit-form-validate-mesa');
if (formValidate) {
    formValidate.addEventListener('submit', (evento) => {
        const nome = document.querySelector('#nome-mesa');
        const numMaxPc = document.querySelector('#num_maximo_pc');

        if (nome.value == '') {
            evento.preventDefault();
            const msgContainer = document.querySelector('.message-alert');
            msgContainer.classList.add('alert-err');
            msgContainer.classList.remove('hide');
            document.querySelector('#msg').textContent = 'Preecha o Nome da Mesa!';
            nome.focus();
            return;
        }

        if (isNaN(numMaxPc.value) || numMaxPc.value == '') {
            evento.preventDefault();
            const msgContainer = document.querySelector('.message-alert');
            msgContainer.classList.add('alert-err');
            msgContainer.classList.remove('hide');
            document.querySelector('#msg').textContent = 'Preecha o Nº máximo de Computadores na Mesa!';
            numMaxPc.focus();
            return;
        }

        if (numMaxPc.value <= 0) {
            evento.preventDefault();
            const msgContainer = document.querySelector('.message-alert');
            msgContainer.classList.add('alert-err');
            msgContainer.classList.remove('hide');
            document.querySelector('#msg').textContent = 'Preecha um número Válido!';
            numMaxPc.focus();
            return;
        }
    });
}

if (editformValidate) {
    editformValidate.addEventListener('submit', (evento) => {
        const nome = document.querySelector('#edit-nome-mesa');
        const numMaxPc = document.querySelector('#edit-num-max-mesa');

        if (nome.value == '') {
            evento.preventDefault();
            const msgContainer = document.querySelectorAll('.message-alert')[1];
            msgContainer.classList.add('alert-err');
            msgContainer.classList.remove('hide');
            document.querySelector('#edit-msg').textContent = 'Preecha o Nome da Mesa!';
            nome.focus();
            return;
        }

        if (isNaN(numMaxPc.value) || numMaxPc.value == '') {
            evento.preventDefault();
            const msgContainer = document.querySelectorAll('.message-alert')[1];
            msgContainer.classList.add('alert-err');
            msgContainer.classList.remove('hide');
            document.querySelector('#edit-msg').textContent = 'Preecha o Nº máximo de Computadores na Mesa!';
            numMaxPc.focus();
            return;
        }

        if (numMaxPc.value <= 0) {
            evento.preventDefault();
            const msgContainer = document.querySelectorAll('.message-alert')[1];
            msgContainer.classList.add('alert-err');
            msgContainer.classList.remove('hide');
            document.querySelector('#edit-msg').textContent = 'Preecha um número Válido!';
            numMaxPc.focus();
            return;
        }
    });
}
