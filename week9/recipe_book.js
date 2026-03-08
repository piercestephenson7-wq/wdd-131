// javascript to change the aria-hidden of the recipe description paragraph when the page is over 768px.
const recipeDescriptions = document.querySelectorAll('.recipe-card p');

function updateAriaHidden() {
    recipeDescriptions.forEach(description => {
        if (window.innerWidth > 768) {
            description.setAttribute('aria-hidden', 'false');
        } else {
            description.setAttribute('aria-hidden', 'true');
        }
    });
}

// Initial check
updateAriaHidden();

// Update on resize
window.addEventListener('resize', updateAriaHidden);
