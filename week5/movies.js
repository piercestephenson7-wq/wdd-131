const allRatingElms = document.querySelectorAll('article.movie p span');

allRatingElms.forEach((elem) => {
console.log(elem);
const rating = elem.innerText.length
elem.setAttribute('aria-label', `${rating} out of 5 stars`)
});
