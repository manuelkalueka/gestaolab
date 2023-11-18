//Opcoes de Menu Conta
const btnAccount = document.querySelector('.btn-account');

if (btnAccount) {
    btnAccount.addEventListener('click', () => {
        const menuPerfil = document.querySelector('#menu-perfil');

        if (menuPerfil.classList.contains('hide')) {
            menuPerfil.classList.remove('hide');
        } else {
            menuPerfil.classList.add('hide');
        }
    });
}

function updateDate() {
    const now = new Date();
    const monthList = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let month = '';
    monthList.forEach((mes, chave) => {
        if (chave == now.getMonth()) {
            month = mes.toString();
        }
    });

    const day = now.getDate();
    const year = now.getFullYear().toString();
    const hours = now.getHours().toString().padStart(2, '0');
    const minites = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const times = `${day} de ${month} de ${year} ${hours}:${minites}:${seconds}`;
    document.querySelector('.date-display-info').innerHTML = times;
}
setInterval(updateDate, 1000);


//Se a page atual for de nome laboratórios então um display none para o button profile

//header.ejs > h1 of className h3Lab
const h3Lab = document.querySelector('#h3Lab');

//laboratorio.ejs > h1 of className h1Lab
const h1Lab = document.querySelector('#h1Lab');

//Atribundo o valor recebindo no arquivo laboratorio.ejs for o fille header.ejs
h3Lab.innerText = h1Lab.innerText;

const buttonProfile = document.querySelector('#buttonProfile');

if(h3Lab.innerText == h1Lab.innerText ){
    buttonProfile.style.display = 'none';
}
else{
    //nothing
}