function fruitColor(fruit) {
    let color = "unknown";
    switch (fruit.toLowerCase()) {
        case 'apple':
        case 'cherry':
        case 'strawberry':
            color = 'red';
            break;
        case 'banana':
        case 'lemon':
            color = 'yellow';
            break;
        case 'kiwi':
        case 'lime':
            color = 'green';
            break;
        case 'blueberry':
        case 'grape':
            color = 'purple';
            break;
        default:
            color = 'unknown';
    }
    return color;
}


function door(state) {
    let result = "unknown";

    switch (state) {
        case 0:
            result = "closed";
            break;
        case 1:
            result = "open";
            break;
        default:
            result = "unknown";
    }
    return result;
}

// door function but different

function doorStatus(state) {
    switch (state) {
        case 0:
            return "closed";
        case 1:
            return "open";
        default:
            return "unknown";  
    }
}

state = prompt("Enter door state (0 for closed, 1 for open):");
doorStatus(state);
alert("The door is " + doorStatus(parseInt(state)));




const allRatingElms = document.querySelectorAll('article.movie p span');

allRatingElms.length;

allRatingElms.forEach((elem) => {
console.log(elem);
const rating = elem.innerText.length
elem.setAttribute('aria-label', `${rating} out of 5 stars`);
});






const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(num => num * 2);

console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10] 


const sum = numbers.reduce((total, num) => total + num);
console.log(sum); // Output: 15


// practice for week6 ponder

const moviesList = document.getElementById('movie-list');

articles.forEach((movie) => {
    const article = document.createElement('article');
    article.classList.add('movie');

    article.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${movie.poster}" alt="${movie.title} poster">
        <p>Release Date: ${movie.year}</p>
        <p>Recommended Age: ${movie.age}</p>
        <p>Genre: ${movie.genre}</p>
        <p>Rating: ${movie.rating} stars</p>
    `;
    moviesList.appendChild(article);
});


const randomNumbers = [5, 3, 8, 1, 2];

randomNumbers.sort((a, b) => a - b);

console.log(randomNumbers); // Output: [1, 2, 3, 5, 8]

const randomLetters = ['d', 'a', 'c', 'b', 'E'];

randomLetters.sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    else if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
});

console.log(randomLetters); // Output: ['a', 'b', 'c', 'd', 'e']


const ChaptersofBookofMormon = [
    { title: "1 Nephi", chapters: 22 },
    { title: "2 Nephi", chapters: 33 },
    { title: "Jacob", chapters: 6 },
    { title: "Enos", chapters: 1 },
    { title: "Jarom", chapters: 1 },
    { title: "Omni", chapters: 1 },
    { title: "Words of Mormon", chapters: 1 },
    { title: "Mosiah", chapters: 29 },
    { title: "Alma", chapters: 63 },
    { title: "Helaman", chapters: 16 },
    { title: "3 Nephi", chapters: 30 },
    { title: "4 Nephi", chapters: 1 },
    { title: "Mormon", chapters: 9 },
    { title: "Ether", chapters: 15 },
    { title: "Moroni", chapters: 10 }
];

ChaptersofBookofMormon.filter((book) => book.chapters > 10)
    .forEach((book) => console.log(book.title)); // Output: "1 Nephi", "2 Nephi", "Jacob"