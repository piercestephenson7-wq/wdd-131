const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc: "images/bechler_falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "images/teton_canyon.webp",
    imgAlt: "Image of Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions: "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc: "images/dunanda_falls.jpg",
    imgAlt: "Image of Denanda Falls",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "images/coffee_pot.jpg",
    imgAlt: "Image of Coffee Pot Rapids",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions: "Take Highway 20 north to Island Park. Continue almost to Mack's Inn. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "images/menan_butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description: "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions: "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, then right onto Twin Butte Road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];


const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredHikes = hikes.filter(hike => hike.name.toLowerCase().includes(searchTerm));
  displayHikes(filteredHikes);
});

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredHikes = hikes.filter(hike => hike.name.toLowerCase().includes(searchTerm));
  displayHikes(filteredHikes);
});

function displayHikes(hikesToDisplay) {
  const hikeContainer = document.getElementById('hike-container');
  hikeContainer.innerHTML = '';

  hikesToDisplay.forEach(hike => {
    const hikeCard = document.createElement('div');
    hikeCard.classList.add('hike-card');

    const tagsHTML = hike.tags.map(tag => `<button>${tag}</button>`).join('');

    const ratingStars = '🥾'.repeat(hike.difficulty);

    hikeCard.innerHTML = `
      <img src="${hike.imgSrc}" alt="${hike.imgAlt}" class="hike-image">
      <div class="hike-content">
        <h2>${hike.name}</h2>
        <div class="hike-tags">
          ${tagsHTML}
        </div>
        <p><strong>Distance:</strong> ${hike.distance}</p>
        <p>${hike.description}</p>
        <div class="difficulty">
          Difficulty: <span class="rating" role="img" aria-label="${hike.difficulty} out of 5">${ratingStars}</span>
        </div>
      </div>
    `;
    hikeContainer.appendChild(hikeCard);
  });
}

displayHikes(hikes);