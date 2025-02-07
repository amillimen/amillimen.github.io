// Creating the map object
let myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

     // Store the API query variables.
// For docs, refer to https://dev.socrata.com/docs/queries/where.html.
// And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.
let baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// Add the dates in the ISO formats
let date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
// Add the complaint type.
let complaint = "&complaint_type=Rodent";
// Add a limit.
let limit = "&$limit=10000";

// Assemble the API query URL.
let url = baseURL + date + complaint + limit;

// d3.json() to get the data
d3.json(url).then(
    (data)=>{
         // simple console log of the data
         console.log(data);

         // step 1 - make an empty array to hold the data points for the heatmap
         let heatArray = [];

         // step 2 - loop through the data points (rodent incident array) and add data points
         // to the heat array
         for(let i = 0; i < data.length; i++)
         {
            // get the location
            let location = data[i].location;

            if(location)
            {
                // if the incident has a location property, get the data point and add to the array
                // index 0 - longitude
                // index 1 - latitude
                heatArray.push([location.coordinates[1], location.coordinates[0]]);
            }
         }

         // step 3 - create the heat map by using L.heatLayer()
         let heat = L.heatLayer(heatArray, {
            radius: 20,
            blur: 35
         }).addTo(myMap);
    }
);