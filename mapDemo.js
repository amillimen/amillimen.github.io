/*
    python function

    def printHello():
        print("Hello")
*/

function printHello()
{
    // simple output
    console.log("Hello");
}

// use the function
printHello();

// add two values together
function addition(a, b)
{
    // return the sum
    return a + b;
}

// display a result of the function call
console.log(addition(100, 50));

// store the result in a variable
let result = addition(1000, 999);

// display the variable
console.log(result);

// mapping demo
// given the following array of steps:
let steps = ["Step One", "Step Two", "Step 3"];

console.log(steps);

/*
let steps2 = [];
// to create an array using a loop
for(let i = 0; i < steps.length; i++)
    steps2.push(steps[i]);
*/

// mapping allows for to create arrays from another array
    // map() uses an inline function to tell how info is going to be processed from 
    // an array
let steps2 = steps.map(
    function(item)
    {
        return item;    // calls an inline function that returns each item from the steps
                        // array and places it into the steps2 array
    }
);

// map() can also be used to get the index values along with the items into another array
let steps3 = steps.map(
    function(item, index)
    {
        return `${item}: ${index}`; // calls inline function, returns the item and the index number
                                    // in a formatted string
    }
);

console.log(steps2);
console.log(steps3);

// map over an array of JSONS
let ghosts = [
    {name: "Inky", color: "blue"},
    {name: "Pinky", color: "pink"},
    {name: "Blinky", color: "red"},
    {name: "Clyde", color: "orange"}
];

// use mapping to get a list of all of the ghost names
let ghostNames = ghosts.map(
    function(ghost)
    {
        return ghost.name; // call inline function, returns the name property from the JSON
                           // and adds to the ghostNames array
    }
);

// use mapping to get a list of all of the ghost names
let ghostNamesAndColor = ghosts.map(ghost=>(`${ghost.name}: ${ghost.color}`));

console.log(ghosts);
console.log(ghostNames);
console.log(ghostNamesAndColor);

// Arrow functions allow for the inline function syntax to be streamlined =>
let ghostNames2 = ghosts.map(
    (ghost) => {
        return ghost.name; // calls inline function and returns the name property, instead of
                           // using 'function', this is replaced with using the =>
    }
);

console.log(ghostNames2);

let ghostNames3 = ghosts.map(ghost=>ghost.name); 
                // calls inline function and returns the name property, instead of
                // using 'function' and the curly braces, this is replaced with using the =>

console.log(ghostNames3);

// load the search results
// get the greekNames
let greekNames = searchResults.map(entry=>entry.greekName);
// get the roman names
let romanNames = searchResults.map(entry=>entry.romanName);

// make a trace for the greek data
let trace = {
    x: greekNames,
    y: searchResults.map(entry=>entry.greekSearchResults),
    type: "bar"
};

// make a trace for the roman data
let trace2 = {
    x: romanNames,
    y: searchResults.map(entry=>entry.romanSearchResults),
    type: "bar"
};

// title for the greek data plot
let layout1 = {
    title: "Greek Search Results"
};

// title for the roman data plot
let layout2 = {
    title: "Roman Search Results"
};

// plot the charts
Plotly.newPlot("plot1", [trace], layout1);
Plotly.newPlot("plot2", [trace2], layout2);

// what if we wanted to plot a bar chart of greek deities that have 10,000,000 or more search results?

// we can use filtering to do this

// to use filtering, first, make a custom function
function highSearchResults(entry)
{
    // entry will be a JSON that contains the key/value pairs from greekromandata.js
    return entry.greekSearchResults > 10000000;
}

// second, call the filter() function and use the custom function to filter / make an array
// based on the custom function
let highSearchedGreeks = searchResults.filter(highSearchResults);

// console log the number of entries in the filtered array
console.log(`Number of Greek Gods with over 10,000,000 searches: ${highSearchedGreeks.length}`);

// make a trace for the filtered data
let trace3 = {
    x: highSearchedGreeks.map(entry=>entry.greekName),
    y: highSearchedGreeks.map(entry=>entry.greekSearchResults),
    type: "bar"
};

// add another title for the third chart
let layout3 = {
    title: "Greeks with over 10,000,000 Search Results"
};

Plotly.newPlot("plot3", [trace3], layout3);

// SLICING IN JS

// array of names
let names = ["Jim", "James", "Paul", "Tyrone", "Erykah"];

// use the slice() function to get a subset of names
// to get the first two names
let firstTwo = names.slice(0, 2); // starts at index 0 and stops before index 2
                                  // returns ["Jim", "James"]

console.log(firstTwo);

// to get the last 3 names
let lastThree = names.slice(2, 5);  // starts at index 2 and stops before index 5
                                    // returns ["Paul", "Tyrone", "Erykah"]

console.log(lastThree);

// SORTING IN JS
// array of numbers
let numbers = [3, 4, 2, 1];
console.log(numbers);
// can also use .reverse function
console.log(numbers.reverse());

// sorting in JS requires the .sort() function with an inline function
// which tells how the values are going to be compared
// to sort the numbers array in descending order:
let descending = numbers.sort(
    // inline compare function
    function compare(first, second)
    {
        // function is used to tell how to compare adjacent values in order to compare and order them
        return second - first;  // not subtracting, the dash tells the inline function
                                // to put the second number before the first if it is greater than
                                // the first number
    }
);

// display the results
console.log(descending);

// we can also do the same sort(s) with arrow functions
let ascending = numbers.sort((first, second) => first - second);
console.log(ascending);

let descendingArrow = numbers.sort((first, second) => (second - first));
console.log(descendingArrow);

// reorder the high searched filtered greek data, in descending order based on the greek search results
let descendingGreekSearchResults = highSearchedGreeks.sort(
    (firstEntry, nextEntry) => nextEntry.greekSearchResults - firstEntry.greekSearchResults
);

// get the top ten of those search results by using .slice() and reverse() to see the data from
// top to bottom in the plot
let greekSliced = descendingGreekSearchResults.slice(0, 10).reverse();

// set up the trace with the sorted and sliced data
let trace4 = {
    x: greekSliced.map(entry=>entry.greekSearchResults),
    y: greekSliced.map(entry=>entry.greekName),
    text: greekSliced.map(entry=>entry.greekName),
    type: "bar",
    orientation: "h" // make a horizontal bar chart
};

// add the title to the layout
let layout4 = {
    title: "Top 10 Greek Search Results",
    margin: {
        l: 100,
        r: 100,
        b: 100,
        t: 100
    }
};

// draw into Plotly
Plotly.newPlot("plot4", [trace4], layout4);