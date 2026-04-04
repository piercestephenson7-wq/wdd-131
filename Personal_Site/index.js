//PRICE CALCULATOR
const calculateBtn = document.getElementById('calculate-btn');
if (calculateBtn) {
    calculateBtn.addEventListener('click', calculatePrice);
}

function calculatePrice() {
    const sqft = document.getElementById('sqft').value;
    const resultText = document.getElementById('result');
    
    const rate = 0.20;
    
    if (sqft > 0) {
        const total = sqft * rate;
        resultText.innerText = `Estimated Price: $${total.toFixed(2)}`;
        resultText.style.color = "green";
    } else {
        resultText.innerText = "Please enter a valid number.";
        resultText.style.color = "red";
    }
}

// CARDS

const cards = [
  {
    id: 1,
    name: "Driveways",
    image: "images/driveway.jpg",
    description: "Years of oil stains, tire marks, and grime don't stand a chance. Our high-pressure driveway cleaning restores concrete and asphalt to like-new condition, boosting your home's curb appeal instantly."
  },
  {
    id: 2,
    name: "Sidewalks",
    image: "images/sidewalk.jpg",
    description: "Algae, mold, and weathering can make sidewalks slippery and unsightly. We blast away buildup to leave your walkways clean, bright, and safe for foot traffic."
  },
  {
    id: 3,
    name: "House Sidings",
    image: "images/house siding.jpg",
    description: "Dirt, mildew, and cobwebs cling to siding over time. Our soft-wash and pressure wash techniques are safe for vinyl, wood, and fiber cement — leaving your home looking freshly painted without the cost."
  },
  {
    id: 4,
    name: "Roofs",
    image: "images/roof.jpg",
    description: "Black streaks and moss growth aren't just ugly — they shorten your roof's lifespan. Our low-pressure roof cleaning removes organic buildup gently, protecting your shingles while restoring a clean look."
  },
  {
    id: 5,
    name: "Gutters",
    image: "images/gutter.jpg",
    description: "Clogged and grimy gutters can cause water damage and overflow. We flush out debris and scrub down the exterior faces so water flows freely and your home's exterior stays clean."
  },
  {
    id: 6,
    name: "Patios",
    image: "images/patio.jpg",
    description: "Bring your outdoor living space back to life. Whether it's concrete, pavers, brick, or stone, we remove stains, moss, and weathering so your patio is ready for entertaining again."
  }
];

// DISPLAY GRID CARDS (index.html)

function displayCards() {
    const servicesContainer = document.getElementById('services');
    if (!servicesContainer) return;

    servicesContainer.innerHTML = '';

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <h3>${card.name}</h3>
            <button aria-label="Learn more about ${card.name}">Learn More</button>
        `;
        
        servicesContainer.appendChild(cardElement);
    });
}

// DISPLAY SERVICE ROWS (services.html)

function displayServiceRows() {
    const servicesList = document.getElementById('services-list');
    if (!servicesList) return;

    servicesList.innerHTML = '';

    cards.forEach(card => {
        const row = document.createElement('div');
        row.className = 'service-row';

        row.innerHTML = `
            <img src="${card.image}" alt="${card.name} pressure washing">
            <div class="service-info">
                <h2>${card.name}</h2>
                <p>${card.description}</p>
                <button onclick="location.href='index.html#quote'">Get a Quote</button>
            </div>
        `;

        servicesList.appendChild(row);
    });
}

// Run the right function based on which page we're on
displayCards();
displayServiceRows();