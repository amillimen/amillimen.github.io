

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

let watercolor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
	minZoom: 1,
	maxZoom: 16,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

// to add a marker
let marker = L.marker([45.52, -122.67], {title: "My first marker"});

// use .bindPopup() to add a popup
marker.bindPopup("<h1>Hello from Portland, Oregon!</h1><hr>Current Population: <b>655,000</b>");

// other types of markers
let circleMarker = L.circleMarker([45.52, -122.69], {
    color: "green", // edge color
    fillColor: "green", // color on inside of shape
    fillOpacity: 0.55,
    radius: 50
}).bindPopup("A Circle Marker");

// rectangle
let rectangleMarker = L.rectangle([[45.55, -122.64], [45.54, -122.61]], {
    color: "black", // edge color
    fillColor: "red", // color on inside of shape
    fillOpacity: 0.55,
    weight: 1,
    stroke: true
}).bindPopup("A Rectangle Marker");

// to make the markers toggleable, add them to an array
let markers = [];

// add the markers to the array
markers.push(marker); // add the regular marker
markers.push(circleMarker); // add the circle marker
markers.push(rectangleMarker); // add the square marker

// once the markers are in the array make a LayerGroup using L.layerGroup()
let markerLayer = L.layerGroup(markers);

// variable to hold the basemaps
let basemaps = {
    Street: street,
    Topographic: topo,
    Watercolor: watercolor
};

// variable to hold the overlay (markerLayer)
let overlayMaps = {
    Markers: markerLayer
}

// make a map object that has coordinates and is drawn in the 'map' id in HTML
// add the marker layer to the map
let myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 13,
    layers: [street, markerLayer]
});

// leaflet control will allow us to toggle the base map and overlay map
L.control.layers(basemaps, overlayMaps).addTo(myMap);
