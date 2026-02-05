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
