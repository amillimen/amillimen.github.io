// Access the USGS API by using D3

// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// make a request to the queryUrl
d3.json(queryUrl).then(
    (data)=>{
        // console log to check if data was received
        //console.log(data); // we need the info from the 'features' key to pass to the createFeatures function
        createFeatures(data.features);
    }
);

// function that processes the data from the features key
function createFeatures(earthquakeData)
{
    // console.log data to make sure it gets into this function
    console.log(earthquakeData);

    // make each marker based on each feature (each earthquake) by using the data from the properties
    // and the geometry property in the geoJson
    function onEachFeature(feature, layer)
    {
        // for all of the markers in the layer of earthquake markers, bind the place and time features
        layer.bindPopup(`${feature.properties.place}<hr>${new Date(feature.properties.time)}`);
    }

    // make the layer of earthquake data points that automatically call on the lat / lon property within
    // the geometry property by using L.geoJSON()
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature // calls the function and binds the popups to all markers on the layer
    });

    // pass the earthquake data layer to the createMap function
    createMap(earthquakes);
}

// function that creates the map using the geoJSON from createFeatures
function createMap(earthquakes)
{
    console.log(earthquakes);

    // make the base layers
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    
      let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      });

    // Create a baseMaps object.
    let baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };  

    // make the overlay to hold the overlay of earthquakes
    let overlayMaps = {
        Earthquakes: earthquakes
      };

    // make the map and provide the defaults
    let myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [street, earthquakes]
      });

    // make the control and reference the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}