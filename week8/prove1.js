document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const healthDisplay = card.querySelector('.stats p:nth-child(3)');
        const levelDisplay = card.querySelector('.stats p:nth-child(2)');
        const buttons = card.querySelectorAll('.buttons');

        buttons[0].addEventListener('click', () => {
            let currentHealth = parseInt(healthDisplay.textContent.split(': ')[1]);
            currentHealth -= 20;
            healthDisplay.textContent = currentHealth <= 0 ? 'Health: Defeated!' : `Health: ${currentHealth}`;
        });

        buttons[1].addEventListener('click', () => {
            let currentLevel = parseInt(levelDisplay.textContent.split(': ')[1]);
            currentLevel += 1;
            levelDisplay.textContent = `Level: ${currentLevel}`;
        });
    });
});