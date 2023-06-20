function selectItem(index) {
    const sidebarItems = document.querySelectorAll('.item-menu');

    sidebarItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active-item');
        } else {
            item.classList.remove('active-item');
        }
    });
}
/*

const btnMenu = document.querySelector('#btn-menu');
const menuLateral = document.querySelector('.menu-lateral');

function abrirFecharMenu() {//expande o menu lateral
    const conteudo = document.querySelector('.conteudo');
    conteudo.classList.toggle('menor');
    menuLateral.classList.toggle('expandido');//add e remove a classe dinamicamente
}

btnMenu.addEventListener('click', abrirFecharMenu);*/