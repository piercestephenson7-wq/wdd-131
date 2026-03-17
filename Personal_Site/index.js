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

function moveToNext() {
  const cards = document.querySelectorAll('.card');
  // Use cards.length so it works for any number of services
  index = (index < cards.length - 1) ? index + 1 : 0;
  updatePosition();
}

function moveToPrev() {
  const cards = document.querySelectorAll('.card');
  // Instead of hard-coding '2', use cards.length - 1
  index = (index > 0) ? index - 1 : cards.length - 1;
  updatePosition();
}

let autoSpin = setInterval(moveToNext, 3000); // Spins every 3 seconds

function resetTimer() {
  clearInterval(autoSpin);
  autoSpin = setInterval(moveToNext, 3000);
}

// Update your existing button listeners
nextBtn.addEventListener('click', () => {
  moveToNext();
  resetTimer();
});

prevBtn.addEventListener('click', () => {
  moveToPrev();
  resetTimer();
});

// Add the new touch listeners here
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  clearInterval(autoSpin); 
}, { passive: true });

track.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) moveToNext();
  else if (touchEndX - touchStartX > 50) moveToPrev();
  resetTimer();
}, { passive: true });

function updatePosition() {
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) {
    // Uses the actual width of the card in case you change CSS later
    const width = cards[0].offsetWidth; 
    track.style.transform = `translateX(-${index * width}px)`;
  }
}