const menuToggle = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});