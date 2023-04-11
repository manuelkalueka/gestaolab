function abrirFecharMenu() {
    const menuElement = document.querySelector('#left_menu');
    const navbar = document.querySelector('.navbar');
    const logoElement = document.querySelector('#logo-sistema');
    const spans = document.querySelectorAll('span.menu-text');

    const actualMedia = '11.3em';
    const newMedia = '3.9em';

    navbar.style.width = '95%';
    logoElement.src = '/images/logo_mini.png';
    menuElement.style.width = newMedia;

    spans.forEach((element) => {
        element.style.display = 'none';
    });
}

const btnToggle = document.querySelector('#menu-toggle').addEventListener('click', abrirFecharMenu);