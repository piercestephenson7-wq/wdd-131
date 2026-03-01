const monsters = [
    {
        name: 'Blue Monster',
        class: 'Mage',
        level: 3,
        health: 80,
        image: ('images/blue_monster.jpg'),
        attacked: function() {
            this.health -= 20;
            if (this.health <= 0) {
                this.health = 0;
                alert(`${this.name} has been defeated!`);
            } else {
                alert(`${this.name} has ${this.health} health remaining.`);
            }
        },
        levelUp: function() {
            this.level += 1;
            alert(`${this.name} has leveled up to level ${this.level}!`);
        }
    },
    {
        name: 'Orange Monster',
        class: 'Warrior',
        level: 5,
        health: 100,
        image: ('images/orange_monster.png'),
        attacked: function() {
            this.health -= 20;
            if (this.health <= 0) {
                this.health = 0;
                alert(`${this.name} has been defeated!`);
            } else {
                alert(`${this.name} has ${this.health} health remaining.`);
            }
        },
        levelUp: function() {
            this.level += 1;
            alert(`${this.name} has leveled up to level ${this.level}!`);
        }
    },
    {
        name: 'Teal Monster',
        class: 'Rogue',
        level: 4,
        health: 90,
        image: ('images/teal_monster.jpg'),
        attacked: function() {
            this.health -= 20;
            if (this.health <= 0) {
                this.health = 0;
                alert(`${this.name} has been defeated!`);
            } else {
                alert(`${this.name} has ${this.health} health remaining.`);
            }
        },
        levelUp: function() {
            this.level += 1;
            alert(`${this.name} has leveled up to level ${this.level}!`);
        }
    }
];

const monsterContainer = document.getElementById('monster-container');

monsters.forEach((monster) => {
    const monsterCard = document.createElement('div');
    monsterCard.classList.add('card');

    const monsterImage = document.createElement('img');
    monsterImage.classList.add('image');
    monsterImage.src = monster.image;
    monsterImage.alt = monster.name;

    const monsterName = document.createElement('h1');
    monsterName.innerText = monster.name;
    monsterName.classList.add('name');

    const monsterStats = document.createElement('div');
    monsterStats.classList.add('stats');
    monsterStats.innerHTML = `
        <p>Class: ${monster.class}</p>
        <p>Level: ${monster.level}</p>
        <p>Health: ${monster.health}</p>
    `;

    const attackButton = document.createElement('button');
    attackButton.innerText = 'Attacked';
    attackButton.classList.add('buttons');
    attackButton.addEventListener('click', () => {
        monster.attacked();
        monsterStats.innerHTML = `
            <p>Class: ${monster.class}</p>
            <p>Level: ${monster.level}</p>
            <p>Health: ${monster.health}</p>
        `;
    });

    const levelUpButton = document.createElement('button');
    levelUpButton.innerText = 'Level Up';
    levelUpButton.classList.add('buttons');
    levelUpButton.addEventListener('click', () => {
        monster.levelUp();
        monsterStats.innerHTML = `
            <p>Class: ${monster.class}</p>
            <p>Level: ${monster.level}</p>
            <p>Health: ${monster.health}</p>
        `;
    });

    monsterCard.appendChild(monsterImage);
    monsterCard.appendChild(monsterName);
    monsterCard.appendChild(monsterStats);
    monsterCard.appendChild(attackButton);
    monsterCard.appendChild(levelUpButton);

    monsterContainer.appendChild(monsterCard);
});