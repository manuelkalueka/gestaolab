const menuItem = document.querySelectorAll('.item-menu');

function selectItem() {//Seleciona o item do menu activo 
    menuItem.forEach((item) => {
        item.classList.remove('active-item');
    });

    this.classList.add('active-item');//elemento que chama a function
}

menuItem.forEach((item) => {
    item.addEventListener('click', selectItem);
});

const btnMenu = document.querySelector('#btn-menu');
const menuLateral = document.querySelector('.menu-lateral');

function abrirFecharMenu() {//expande o menu lateral
    menuLateral.classList.toggle('expandido');//add e remove a classe dinamicamente
}

btnMenu.addEventListener('click', abrirFecharMenu);