// create tile layers for the backgrounds of themap
var defaultMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 16,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//grayscale layer

var grayscale = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

//Watercolor map layer
var waterColor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
	minZoom: 1,
	maxZoom: 16,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

//topo Map Later
var topoMap =  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


let basemaps = {
    GrayScale: grayscale,
    "Water Color": waterColor,
    Topographic: topoMap,
    Default: defaultMap
};

var myMap = L.map("map", {
    center: [36.7783, -119.4179],
    zoom: 5, 
    layers: [grayscale, waterColor, topoMap, defaultMap]
 });


//add the default map to the map
defaultMap.addTo(myMap);



//get the data for the tectonic plates and draw on the map

//variable to hold the tectoic plates layer
let tectonicplates = new L.layerGroup();

//call the api to get the info for the tectonic plates
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/refs/heads/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){
    //console log to make sure data loads
    //console.log(plateData);

    //load data using geoJson and add to the tectonic plates layer
    L.geoJson(plateData,{
    //add styling to make lines visible
    color: "yellow",
    weight: 1
    }).addTo(tectonicplates);
});

//add the tectonic plates to the map
tectonicplates.addTo(myMap);

//create variable for the earthquake points
let earthquakes = new L.layerGroup();

//get data for earthquakes and populate layergroup
//make call to the data 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(
    function(earthquakeData){
        //plot circles where radious is dependent upon magnitude and color is dependent on depth
        function dataColor(depth){
            if (depth > 90)
                return "red";

            else if(depth >70)
                return "#ff6200";

            else if(depth > 50)
                return "#ff8f00";

            else if(depth > 30)
                return "#fffe00";  
            
            else if(depth > 10)
                return "#8dff00";  

            else 
                return "green";

        }

        //makea function to determine the size of the radius
        function readiusSize(mag){
            if (mag ==0)
                return 1; //make sure that a 0 mag earthquake shows up

            else
                return mag * 5; // scales the difference between earthquake magnitudes
        }

        //add on to the sytle for each data point
        function dataStyle(feature)
        {
            return{
                opacity: .5,
                fillOpacity: .5,
                fillColor: dataColor(feature.geometry.coordinates[2]),
                color: "000000", //this is black
                radius: readiusSize(feature.properties.mag),
                weight: 0.5,
                stroke: true
            }
        }

        //add the GeoJson Data
        L.geoJson(earthquakeData, {
            //make each feature a marker that is on the map, each marker is a circle
            pointToLayer: function(feature, latLng){
                return L.circleMarker(latLng);
            },

            //set style for each marker
            style: dataStyle, //calls the dataStyle function and passes in the earthquake data
            //add popups
            onEachFeature: function(feature, layer){
                layer.bindPopup(`Magnitude: <b> ${feature.properties.mag}</b><br>
                                Depth: <b> ${feature.geometry.coordinates[2]}</b><br>
                                Location: <b>${feature.properties.place}</b>`);
            }

            
        }).addTo(earthquakes);
        
    }

);

//add the earthquakes layer
earthquakes.addTo(myMap);

//add to the overlay for the tectonic plates and earthquakes
let overlays = {
    "Tectonic plates": tectonicplates,
    "Earthquake Data": earthquakes

}

//add the Layer Control
L.control
    .layers(basemaps, overlays)
    .addTo(myMap);

//add the legend to the map
let legend = L.control({
    position: "bottomright"
});

//add the properties for the legend
legend.onAdd = function(){
    //div for legend to appear in the page
    let div = L.DomUtil.create("div", "info legend");

        //set up the intervals
    let intervals = [-10, 10, 30, 50, 70, 90];

        //set the colors
    let colors = ["green", "#8dff00", "#fffe00", "#ff8f00", "#ff6200", "red"];


   // for(var i = 0; i < intervals.length; i++)
     //       {
       //         let legendInfo = "<h1>Legend<h1>"+
//
  //              "div class=\"labels\">" +
    //            "div class=\"min\">" + limits[0] + "<div>" + 
      //          "div class=\"max\">" + limits[limits.length-1].toLocaleString() + "</div>" + 
        //        "</div>";
       // }
        
    div.innerHTML = legendInfo; //produces the code

};

//add legend
legend.addTo(myMap);
