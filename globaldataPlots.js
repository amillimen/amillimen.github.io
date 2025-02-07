// check to see if the data from globaldata.js loads
console.log(country_data);

// make an array of values based on the JSONs in the country_data JSON
let countryInfo = Object.values(country_data);
console.log(countryInfo);

// make an array of country names based on the key values in the country_data JSON
let countries = Object.keys(country_data);
console.log(countries);

// make an array of the categories based on the key values from a country such as Australia
let categories = Object.keys(country_data.australia);
console.log(categories);

// to get the data for Australia
let australia = Object.values(country_data.australia);
console.log(australia);

// to get the data for Brazil
let brazil = Object.values(country_data.brazil);

// to get the data for UK
let uk = Object.values(country_data.uk);

// to get the data for Mexico
let mexico = Object.values(country_data.mexico);

// to get the data for Singapore
let singapore = Object.values(country_data.singapore);

// to get the data for South Africa
let southAfrica = Object.values(country_data.southAfrica);

// function that draws the initial bar and pie chart
function init()
{
    // trace for the bar chart
    let barTrace = {
        x: categories,
        y: australia, // plots the Australia data
        type: "bar"
    };

    barLayout = {
        title: "Bar Chart"
    };

    Plotly.newPlot("bar", [barTrace], barLayout);

    // trace for the pie chart
    let pieTrace = {
        values: australia, // plots the Australia data
        labels: categories,
        type: "pie",
        sort: false // makes it so that the pie chart categories are not reordered
    };

    pieLayout = {
        height: 600,
        width: 800,
        title: "Pie Chart"
    };

    Plotly.newPlot("pie", [pieTrace], pieLayout);
}

// function allows for the data to be updated based on the dropdown from the HTML
function getData()
{
    // use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset"); // connects to the select with the id="selDataset"

    // use the dropdownMenu to access the value property
    let dataset = dropdownMenu.property("value");

    // make a new array to hold the updated country's data
    let newData = [];

    // update the newData array based on the dataset value
    if(dataset == 'australia')
        newData = australia;
    else if(dataset == 'brazil')
        newData = brazil;
    else if(dataset == 'uk')
        newData = uk;
    else if(dataset == 'mexico')
        newData = mexico;
    else if(dataset == 'singapore')
        newData = singapore;
    else if(dataset == 'southAfrica')
        newData = southAfrica;

    // update plotly
    Plotly.restyle("bar", "y", [newData]); // update the bar chart
    Plotly.restyle("pie", "values", [newData]); // update the pie chart
}

// track the change of the dataset from the dropdown
d3.selectAll("#selDataset").on("change", getData);

// call init() to draw the initial charts
init();