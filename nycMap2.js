// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// use D3 to load the data from the nyc.geojson file
d3.json('nyc.geojson').then(
    (data)=>{
        console.log(data);

        // make a quick outline of the boroughs and neighborhoods 
        //L.geoJson(data).addTo(myMap);

        // control for the upper right corner for highlighting a neighborhood
        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

         // method that we will use to update the control based on feature properties passed
         info.update = function (properties) {
            // when a neighborhood is highlighted, adds/updates the following div:
            /*
                <div class="info">
                    <h4>Neighborhoods in New York City Boroughs</h4>
                    <br>
                    <center>
                        Neighborhood: <b>Park Hill</b>
                        <br>
                        Borough: <b>Staten Island</b>
                    </center>
                </div>
            */

            // when a neighborhood is not highlighted highlighted, adds/updates the following div:
            /*
                <div class="info">
                    <h4>Neighborhoods in New York City Boroughs</h4>
                    <br>
                    <center>Hover over a neighborhood</center>
                </div>
            */

            this._div.innerHTML = '<h4>Neighborhoods in New York City Boroughs</h4><br>'+ 
            (properties ? "<center>Neighborhood: <b>" + properties.neighborhood + "</b><br>Borough: <b>"+
                properties.borough
                +"</b></center>":  
                '<center>Hover over a neighborhood</center>');
        };

        // adds the neighborhood info legend to the map
        info.addTo(myMap);

        // JSON keeps count of the number of neighborhoods in each borough
        let neighborhoodCounts = {
            "Brooklyn": 0,
            "Bronx": 0,
            "Manhattan": 0,
            "Queens": 0,
            "Staten Island": 0
        }

        // loop through the data.features (each neighborhood and update the counts)
        for(let i = 0; i < data.features.length; i++)
        {
            if(data.features[i].properties.borough == "Brooklyn")
                neighborhoodCounts["Brooklyn"]++;
            else if(data.features[i].properties.borough == "Bronx")
                neighborhoodCounts["Bronx"]++;
            else if(data.features[i].properties.borough == "Manhattan")
                neighborhoodCounts["Manhattan"]++;
            else if(data.features[i].properties.borough == "Queens")
                neighborhoodCounts["Queens"]++;
            else
                neighborhoodCounts["Staten Island"]++;
        }

        //console.log(neighborhoodCounts);

        // make a legend to hold the neighborhood counts
        var boroughLegend = L.control({position: "bottomleft"});

        boroughLegend.onAdd = function()
        {
            let div = L.DomUtil.create("div", "boroughLegend");
            div.innerHTML += "<center><h4>Number of Neighborhoods per Borough</h4></center>"
            div.innerHTML += `<p class=\"brooklyn\">Brooklyn: <b>${neighborhoodCounts["Brooklyn"]}</b></p>`;
            div.innerHTML += `<p class=\"bronx\">Bronx: <b>${neighborhoodCounts["Bronx"]}</b></p>`;
            div.innerHTML += `<p class=\"manhattan\">Manhattan: <b>${neighborhoodCounts["Manhattan"]}</b></p>`;
            div.innerHTML += `<p class=\"queens\">Queens: <b>${neighborhoodCounts["Queens"]}</b></p>`;
            div.innerHTML += `<p class=\"statenIsland\">Staten Island: <b>${neighborhoodCounts["Staten Island"]}</b></p>`;
            return div;
        }

        boroughLegend.addTo(myMap);

        // use borough attribute to color the borough using this inline function
        function boroughColor(borough)
        {
            // use borough name as a parameter to choose one of the following colors
            if (borough == "Brooklyn") return "yellow";
            else if (borough == "Bronx") return "red";
            else if (borough == "Manhattan") return "orange";
            else if (borough == "Queens") return "green";
            else if (borough == "Staten Island") return "purple";
            else return "black";
        }

        // expand the properties of L.geoJson to style the boroughs
        L.geoJson(data,
            {
                // use the style attribute to go and add some different styling to the outline
                /*style: {
                    color: "black",
                    fillColor: "pink",
                    fillOpacity: 0.6,
                    weight: 2
                }*/
                style: function(feature)
                {
                    return {
                        color: "black",
                        fillColor: boroughColor(feature.properties.borough),
                        fillOpacity: 0.6,
                        weight: 2
                    }
                },
                // onEachFeature property, can be used to tell what happens when we interact
                // with the drawn out portions of the map (the boroughs and neighborhoods) 
               onEachFeature: function(feature, layer){
                // Giving each feature a popup with information that's relevant to it
                layer.bindPopup("<center><h2>" + feature.properties.neighborhood + "</h2> <hr> <h3>" + feature.properties.borough + "</h3></center>");
                // set mouse events to change map styling when neighborhoods are hovered
                layer.on({
                    // When a user's mouse cursor touches a map feature (neighborhood), the mouseover event calls this function, which makes the neighborhood highlight
                    mouseover: function(event)
                    {
                        // reference the item (layer) that triggers the event
                        layer = event.target;
                        // use setStyle to update the fillOpacity style property
                        layer.setStyle({
                            fillOpacity: 0.9,
                            weight: 5
                        });
                        
                        // calls the update() function and passes in the properties for updating the
                        // control on mouseover
                        info.update(layer.feature.properties);
                    },
                     // When the cursor no longer hovers over a map feature (neighborhood) (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
                    mouseout: function(event)
                    {
                        // reference the item (layer) that triggers the event
                        layer = event.target;
                        // use setStyle to update the fillOpacity style property
                        layer.setStyle({
                            fillOpacity: 0.6,
                            weight: 2
                        });

                        // calls the update() function and clears the control on mouseout
                        info.update();
                    }
                });
               }
            }
        ).addTo(myMap);

        
       
    }
);