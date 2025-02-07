// variable that holds our name
var myName = "Dr. A";

// a variable to hold a title that includes our name
let title = `${myName}'s First Plotly Chart`;

// an array of book titles
let books = ["Welcome to Dead House", "Why I am Afraid of Bees", "It Came From Beneath the Sink"];

// an array to hold the number of times each book was read
var timesRead = [15, 30, 22];

// make a JSON of the data from the variables
let myData = {
    name: myName,
    favoriteBooks: books,
    timesRead: timesRead,
    age: 39
};

// display the info using console.log()
console.log(myData);

// make the data trace JSON
let trace = {
    x: books,
    y: timesRead,
    type: "bar"
};

let data = [trace];

// set layout criteria by formatting the title
let layout = {
    title: title
};

// draw the plot in the 'plot' id in the HTML
Plotly.newPlot("plot", data, layout);