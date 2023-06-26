//pega dados para ver
async function getUser(id) {
    try {
        const userId = id;

        const response = await fetch('/usuarios/' + userId);//pega os dados para editar
        const data = await response.json();

        await data.forEach((usuario) => {
            document.querySelector('.modal-card-title.ver-nome').innerHTML = usuario.nome_completo;
            document.querySelector('.ver-bi').innerHTML = usuario.bi;
            document.querySelector('.ver-genero').innerHTML = usuario.genero;
            document.querySelector('.ver-tipoConta').innerHTML = usuario.tipo_conta;
            document.querySelector('.ver-estado').innerHTML = usuario.estado;
        })
    }
    catch (erro) {
        console.log("Houve um erro " + erro.message);
    }
}