console.log(searchResults);

// make arrays to hold info from each of the key-value pairs from the list of JSONs from
// greekromandata.js - names (pair), greekName, romanName, greekSearchResults, and romanSearchResults
var names = [];
var greekNames = [];
var romanNames = [];
var greekSearchResults = [];
var romanSearchResults = [];

// loop through the searchResults array from greekroman.js and populate each array
for(let i = 0; i < searchResults.length; i++)
{
    let entry = searchResults[i]; // gets the current JSON from the array

    // extract each key-value pair and use .push() to populate each array
    names.push(entry.pair); 
    greekNames.push(entry.greekName);
    romanNames.push(entry.romanName);
    greekSearchResults.push(entry.greekSearchResults);
    romanSearchResults.push(entry.romanSearchResults);
}

// to make a cluster bar chart, we can plot two bar chart traces together
let greekTrace = {
    x: names, // greek and roman name pair
    y: greekSearchResults, // greek search results
    text: greekNames,   // changes the hover text
    name: "Greek Results", // changes the legend text
    type: "bar"
};

let romanTrace = {
    x: names, // greek and roman name pair
    y: romanSearchResults, // roman search results
    text: romanNames,   // changes the hover text
    name: "Roman Results", // changes the legend text
    type: "bar"
};

// make a data list that contains the traces
let data2 = [greekTrace, romanTrace];

// add some layout criteria
let layout = {
    title: "Greek vs. Roman Deity Search Results",
    barmode: "group", // makes a clustered bar chart
    margin: {
        l: 50,
        r: 50,
        b: 200, // allows for the name to show up on the x ticker
        t: 50,
        pad: 4 // add 4 extra px of padding all around
    }
};

// plot the visual
Plotly.newPlot("plot2", data2, layout);