// Select the button and the nav menu
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('header nav');

// Toggle the menu when button is clicked
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent click from bubbling to document
  navMenu.classList.toggle('show');
  menuBtn.classList.toggle('open'); // optional for hamburger animation
});

// Close menu if clicking outside
document.addEventListener('click', () => {
  navMenu.classList.remove('show');
  menuBtn.classList.remove('open');
});