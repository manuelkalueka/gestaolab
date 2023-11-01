function hideLoader() {
    document.addEventListener("DOMContentLoaded", () => {
        const loaderContainer = document.querySelector(".loader-container");
        document.body.style.overflow = "hidden";
        // Remova o loader após o conteúdo ser totalmente carregado
        setTimeout(() => {
            loaderContainer.style.display = "none";
            // document.body.style.overflow = "visible";
        }, 500);
    });
}

hideLoader();

function openReportPage(item, page) {
    item.addEventListener('click', () => {

        window.location.href = `${window.location.origin}/${page}`;
    });
}

const dashCards = document.querySelectorAll('.dash-card');

const pages = [
    'materiais',
    'mesas',
    'materiais?tipo=computador',
    'materiais?tipo=computador&estado=danificado',
    'materiais?type=computador&estado=rasoavel',
    'materiais?type=computador&estado=bom'
];

dashCards.forEach((item, chave) => {
    openReportPage(item, pages[chave])
})
