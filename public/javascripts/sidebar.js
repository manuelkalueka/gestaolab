function showOnlyIcon() {
    const ckToggleMenu = document.getElementById('ckToggleMenu');
    if (ckToggleMenu.checked) {
        const textMenuElement = document.querySelector('.menu-text');
        textMenuElement.forEach((element) => {
            element.style.display = 'none';
        });
    }
}

const sidebarBtn = document.getElementById('sidebar-btn');
sidebarBtn.addEventListener('click', showOnlyIcon);