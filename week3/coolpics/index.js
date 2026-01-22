const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('header nav ul');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('show');
    menuBtn.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('header nav') && !e.target.closest('.menu-btn')) {
        navMenu.classList.remove('show');
        menuBtn.classList.remove('open');
    }
});