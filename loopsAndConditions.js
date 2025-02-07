let x = 1;
let y = 5;

// single alternatives - if statements
if(x == 1){
	console.log("x is equal to 1");
}

if(y != 1){
	console.log("y is not equal to 1");
}

// dual alternatives - if / else statements
if(x > 5){
	console.log("x is greater than 5");
}
else
{
	console.log("x is less than or equal to 5");
}

// multiple alternatives - if/else if

if(x > 1){
	console.log("x is greater than 1");
}
else if(x < 1)
{
	console.log("x is less than 1");
}
else{
	console.log("x is equal to 1");
}

// == compares 2 values to see if they are equal
// === compares 2 values to see if the value and data type are equal
let a = 1;
let b = "1";

// use == 
if(a == b)
{
    console.log("a is equal in magnitude to b regardless of the data type");
}
else
{
    console.log("a is not equal to b");
}

// use ===
if(a === b)
{
    console.log("a is equal in magnitude to b including data type");
}
else
{
    console.log("a is not equal to b");
}

// loops in JS
console.log("-----------------------");

for (var i = 0; i < 5; i++)
{
    console.log(`Iteration # ${i}`);
}

console.log("-----------------------");

let people = ["Fred", "Wilma", "Barney", "Betty", "Pebbles", "Bam Bam"];

for (var i = 0; i < people.length; i++)
{
    console.log(people[i]);
}