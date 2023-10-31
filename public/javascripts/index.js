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