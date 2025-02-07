// JSONs for US Cities that contain city names, populations, and state location
// will also contain state name and population
let locations = [
    {
        coordinates: [40.7128, -74.0059],
        state: {
          name: "New York State",
          population: 20201249
        },
        city: {
          name: "New York",
          population: 8804190
        }
      },
      {
        coordinates: [34.0522, -118.2437],
        state: {
          name: "California",
          population: 39538223
        },
        city: {
          name: "Los Angeles",
          population: 3898747
        }
      },
      {
        coordinates: [41.8781, -87.6298],
        state: {
          name: "Illinois",
          population: 12812508
        },
        city: {
          name: "Chicago",
          population: 2746388
        }
      },
      {
        coordinates: [29.7604, -95.3698],
        state: {
          name: "Texas",
          population: 29145505
        },
        city: {
          name: "Houston",
          population: 2304580
        }
      }
];

// use the array of JSONs to create circle markers that will have the state and city information
// in toggleable markers

// in this example, we can size the radius of the circle markers by using the population property
// (city or state)
// function will determine the size of the circle marker's radius by using the sq root of the 
// population property
function markerSize(population)
{
    return Math.sqrt(Math.sqrt(population));
}

// arrays to hold the city markers and the state markers
let cityMarkers = [];
let stateMarkers = [];

// loop through the locations array and create markers for each city and state, and add them to their
// marker array
for(let i = 0; i < locations.length; i++)
{
    // populate the state markers
    stateMarkers.push(
        // call to L.circleMarker()
        // get the info from the 'state' key in the locations JSON
        L.circleMarker(locations[i].coordinates, {
            fillColor: "white",
            color: "black",
            fillOpacity: 0.60,
            radius: markerSize(locations[i].state.population) // call the markerSize function
        }).bindPopup(`<h2>State Name: ${locations[i].state.name}</h2>
            <hr><p>State Population: <b>${locations[i].state.population}</b></p>`)
    );

    // populate the city markers
    cityMarkers.push(
        // call to L.circleMarker()
        // get the info from the 'city' key in the locations JSON
        L.circleMarker(locations[i].coordinates, {
            fillColor: "green",
            color: "black",
            fillOpacity: 0.60,
            radius: markerSize(locations[i].city.population) // call the markerSize function
        }).bindPopup(`<h2>City Name: ${locations[i].city.name}</h2>
            <hr><p>City Population: <b>${locations[i].city.population}</b></p>`)
    );
}

// make layer groups from the city and state markers
let states = L.layerGroup(stateMarkers);
let cities = L.layerGroup(cityMarkers);

// create base layers
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// create a JSON for the Base layers
let baseMaps = {
    "Street Map": street,
    Topographic: topo
};

// create a JSON for the overlays that reference the marker layer groups
let overlayMaps = {
    "State Population": states,
    "City Population": cities
};

// make map object with the defaults
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, states, cities]
});

// add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false    // expands the layer control automatically
}).addTo(myMap);