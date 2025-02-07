// Creating the map object
let myMap = L.map("map", {
    center: [27.96044, -82.30695],
    zoom: 7
  });

  // Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// get the data from the geoJSON file using D3
d3.json("ACS-ED_2014-2018_Economic_Characteristics_FL.geojson").then(
    (data)=>{
        console.log(data);

        // make a choropleth layer
        let geojson = L.choropleth(data, {
            // define the property to use
            valueProperty: "DP03_16E", // households with children between 6-17 years old

            // set a color scale - used to color the gradients of each county based on range of values
            // of the value property
            scale: ["#ffffb2", "#b10026"],

            // use steps property to tell the number of breaks (gradients) between the min and max 
            steps: 10,

            // use mode to break up the steps - 'q' for quartiles, 'k' k-means, 'e' - equidistant
            mode: "q",

            // use style for coloring each of the counties
            style: {
                color: "white",
                weight: 1,
                fillOpacity: 0.75
            },

            // use onEachFeature to bind a popup
            onEachFeature: function(feature, layer){
                layer.bindPopup(`${feature.properties.NAME} <hr> Population of families with children between 6-17: ${feature.properties.DP03_16E.toLocaleString()}`)
            }

        }).addTo(myMap);
        
        // set up the legend
        let legend = L.control({position: "bottomleft"});

        // use .onAdd to add content to the legend
        legend.onAdd = function(){
            // .create() to make a 'div' that is going to hold the map
            let div = L.DomUtil.create("div", "info legend"); 
                /*
                    makes a <div class="info legend"></div>
                */
            // establish the limits (max and min) value of the valueProperty
            let limits = geojson.options.limits;

            // tell what colors are associated with the max and minimum of the value property
            let colors = geojson.options.colors;

            // make an array to hold the labels to show the max / min value along with the color gradients
            let labels = [];

             // Add the minimum and maximum.
            let legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
            "<div class=\"labels\">" +
                "<div class=\"min\">" + limits[0] + "</div>" +
                "<div class=\"max\">" + limits[limits.length - 1].toLocaleString() + "</div>" +
            "</div>";
            
            /*
                <div class="info legend">
                    <h1>Population with Children<br>Ages 6-17</h1>
                    <div class="labels">
                        <div class="min">345</div>
                        <ul>
                            <li style="background-color: #ffffb2"></li>
                            <li style="background-color: #ffffb6"></li>
                            <li style="background-color: #ffffb8"></li>
                            <li style="background-color: #ffffc1"></li>
                        </ul>
                        <div class="max">888,777</div>
                    </div>
                </div>
            */

            div.innerHTML = legendInfo; // produces the above code

            // to add the color blocks for the gradients of the value property that colors the counties
            // use forEach() to process each limit and add a li with colors
            limits.forEach(function(limit, index){
                labels.push("<li style=\"background-color: " + colors[index] +"\"></li>");
            });

            // we have to put the li's into a <ul>
            // labels.join("") brings all of the <li> from the labels array into one 
            div.innerHTML += "<ul>" + labels.join("") + "</ul>";

            // return the updated div
            return div;
        };

        // take the legend with the updated div and add to the map
        legend.addTo(myMap);

        // Alternative legend - Vertical which appears in the bottom right corner of the page
        // set up the second legend
        let legend2 = L.control({position: "bottomright"});

        // Then add all the details for the legend
        legend2.onAdd = function () {
            let div2 = L.DomUtil.create("div", "info legend2");

            // Initialize depth intervals and colors for the legend
            let limits = geojson.options.limits;
            let colors = geojson.options.colors;

            let legendInfo = "<h2>Population with Children<br />(ages 6-17)</h2>"
            div2.innerHTML = legendInfo;

            // Loop through our depth intervals to generate a label with a colored square for each interval.
            for (let i = 0; i < limits.length; i++) {
            div2.innerHTML += "<i style='background: " + colors[i] + "'></i> "
                + limits[i].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}) + (limits[i + 1] ? "&ndash;" + limits[i + 1].toFixed() + "<br>" : "+");
            }
            return div2;
        };

        // Finally, add the legend to the map.
        legend2.addTo(myMap);
    }
);