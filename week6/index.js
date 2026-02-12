const list = document.querySelectorAll("li");


list.forEach(item => {
    console.log(item.textContent);
});

const numbers = [1, 2, 3, 1];

const sum = numbers.reduce((total, num) => total + num);
console.log(sum);

const students = [
    { fname: "Aaron", lname: "Andrus" },
    { fname: "Manny", lname: "Masa" },
    { fname: "Tamanda", lname: "Tanda" }
];

const fullNames = students.map(student => `${student.fname} ${student.lname}`);
console.log(fullNames);



function checkAdult(age) {
  return age >= 20;
} 
const ages = [18, 22, 19];
const result = ages.filter(checkAdult);
console.log(result);



const colors = ["red", "green", "blue", "yellow", "purple"];

const ul = document.createElement("ul");

colors.forEach(color => {
    const li = document.createElement("li");
    li.textContent = color;
    ul.appendChild(li);
});

document.body.appendChild(ul);
