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

//CAROUSEL

const track = document.querySelector('.carousel-track');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let index = 0;

nextBtn.addEventListener('click', () => {
  const cards = document.querySelectorAll('.card');
  if (index < cards.length - 1) {
    index++;
  } else {
    index = 0; 
  }
  updatePosition();
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
  } else {
    index = 2;
  }
  updatePosition();
});

function updatePosition() {
  track.style.transform = `translateX(-${index * 300}px)`;
}