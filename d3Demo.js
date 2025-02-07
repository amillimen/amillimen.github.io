// we can use D3 to access APIs
let URL = "https://api.spacexdata.com/v4/launchpads";

// to process data from an external online source such as an API, we need to use a JS Promise
// use d3.json() to allow for us to tell what we will do when we get the info from the API
let dataPromise = d3.json(URL);
// show the data promise
console.log(dataPromise);

// to fulfill the promise (Access the [[DataResult]] from the request), use .then function to process
// the data
d3.json(URL).then(
    // specify what to do with the data using an INLINE FUNCTION
    // to display the results of the API call
    function(data)
    {
        console.log(data);
    }
);

// we can use the => instead of the inline function when processing the info from d3.json()
d3.json(URL).then(data=>console.log(data));

// we can use D3 to also interact with content that is on a page already
// to reference the text with the class="text1" attribute
let text1 = d3.select(".text1").text(); // gets the text from the div tag with the 
                                        // class="text1" attribute
console.log(text1);

// to reference the text with the id="text2" attribute
let text2 = d3.select("#text2").text(); // gets the text from the div tag with the 
                                        // id="text2" attribute
console.log(text2);

// modify the text of an HTML element
d3.select(".text1").text("Hey, this text is different!");
text1 = d3.select(".text1").text(); // gets the updated text from the div tag with the 
                                        // class="text1" attribute
console.log(text1);

// get the HTML of the link
let myLink = d3.select(".my-link").html();
console.log("my-link", myLink);

// get the nested tag of the link
let myLinkA = d3.select(".my-link>a");
console.log(myLinkA);

// use the .attr from the myLinkA to get the link
let myLinkAattr = myLinkA.attr("href");
console.log(myLinkAattr);

// use chaining to change the URL of the link
d3.select(".my-link>a").attr("href", "https://www.google.com").text("Now this is a link to Google");

// populate the bootstrap table
let table = d3.select("table"); // selects the table tag for use

// Use D3 to create a bootstrap striped table
// https://getbootstrap.com/docs/5.3/content/tables/#striped-rows
table.classed("table-striped", true);

// use d3 to select the table body
let tbody = d3.select("tbody");

let grades = [["Malcolm", 80], ["Zoe", 85], ["Kaylee", 99], ["Simon", 99], ["Wash", 79]];

// use a loop to populate the bootstrap table using the grades array
for(var i = 0; i < grades.length; i++)
{
    // get the current student's name (index 0) and grade (index 1) 
    let grade = grades[i];

    // append a tr tag to the table body
    let row = tbody.append("tr"); // adds a <tr> tag to the table body for a new row of student grades

    // append one td cell to the row for the student's name
    row.append("td").text(grade[0]); // adds a <td> to the row with the student's name:
                                     // ie <td>Malcolm</td>
    
    // append one td cell to the row for the student's grade
    row.append("td").text(grade[1]); // adds a <td> to the row with the student's grade:
                                     // ie <td>80</td>

    /*
        <tr>
            <td>Malcolm</td>
            <td>80</td>
        </tr>
    */
}

// D3 Events
d3.select("#button1").on("click", 
    function()
    {
        // use .this() to tell what was clicked
        console.log(this);

        // reference the counter
        let counter = d3.select(".counter");

        // get the value of the counter
            // counter.text() is going to be a string, use parseInt() to convert to an integer
        let counterValue = parseInt(counter.text());

        // update the value by adding 1
        counterValue++; // same as counterValue = counterValue + 1;

        // update the h2 text after the button is clicked
        counter.text(counterValue);
    });

d3.select("#button2").on("click", 
    function()
    {
        // use .this() to tell what was clicked
        console.log(this);

        // reference the counter
        let counter = d3.select(".counter");

        // to reset the counter
        counter.text("0");
    });