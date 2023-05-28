//Opcoes de Menu Conta
const btnAccount = document.querySelector('#btn-account').addEventListener('click', () => {
    const menuPerfil = document.querySelector('#menu-perfil');

    if (menuPerfil.classList.contains('hide')) {
        menuPerfil.classList.remove('hide');
    } else {
        menuPerfil.classList.add('hide');
    }
});