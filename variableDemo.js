// use let or var to declare a variable
var name = "Cheese Mac";
let age = 15;
var hourlyWage = 15.5598989;
let formattedWage = hourlyWage.toFixed(2);

// JSONs
let inky = {
    name: "Inky",
    color: "Blue"
};

let pinky = {
    name: "Pinky",
    color: "Pink"
};

let blinky = {
    name: "Blinky",
    color: "Red"
};

let clyde = {
    name: "Clyde",
    color: "Orange"
};

// add items to arrays
let friends = ["Jim", "James", "Paul", "Tyrone"];

let ghosts = [inky, pinky, blinky, clyde];

// console logs of the data
console.log(`Name: ${name}`);
console.log(`Age: ${age}`);
console.log(`Hourly Wage: $${formattedWage}`);
console.log("----------------------------");
console.log(`${friends}`);
console.log("----------------------------");
console.log(ghosts);