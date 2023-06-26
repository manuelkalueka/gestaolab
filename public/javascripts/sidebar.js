function MarcaPaginaAtiva() {
    const paginaActual = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.item-menu a');
    links.forEach(link => {
        const linkUrl = link.getAttribute('href').split('/').pop();

        console.log(linkUrl + "\n");
        console.log(paginaActual);

        if (linkUrl == paginaActual) {
            link.classList.add('active-item');
        } else {

            link.classList.remove('active-item');
        }
    });
}

window.addEventListener('DOMContentLoaded', MarcaPaginaAtiva);