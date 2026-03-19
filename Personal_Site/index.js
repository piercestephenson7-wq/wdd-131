//PRICE CALCULATOR

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
    image: "images/driveway.jpg"
  },
  {
    id: 2,
    name: "Sidewalks",
    image: "images/sidewalk.jpg" 
  },
  {
    id: 3,
    name: "House Sidings",
    image: "images/house siding.jpg" 
  },
  {
    id: 4,
    name: "Roofs",
    image: "images/roof.jpg" 
  },
  {
    id: 5,
    name: "Gutters",
    image: "images/gutter.jpg"
  },
  {
    id: 6,
    name: "Patios",
    image: "images/patio.jpg"
  }
]

// DISPLAY CARDS

function displayCards() {
    const servicesContainer = document.getElementById('services');
    
    // Clear any existing content
    servicesContainer.innerHTML = '';

    cards.forEach(card => {
        // Create the card element
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        // Set the internal HTML using the card data
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <h3>${card.name}</h3>
            <button aria-label="Learn more about ${card.name}">Learn More</button>
        `;
        
        servicesContainer.appendChild(cardElement);
    });
}

// Call the function to run it
displayCards();