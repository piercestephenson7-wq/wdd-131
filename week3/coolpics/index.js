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

const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(evt) {
    if (evt.target.tagName === 'IMG') {
        modalImage.src = evt.target.dataset.large || evt.target.src;
        modal.showModal();
    }   
}

// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});