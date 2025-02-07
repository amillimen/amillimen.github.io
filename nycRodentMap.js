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

         // loop through the array of data (rodent incidents)
         for(let i = 0; i < data.length; i++)
         {
            // get the location property
            let location = data[i].location;

            // use an if statement to check to see if the location property is populated
            if(location)
            {
                // if the location property is populated, add a marker to the map
                // index 0 is the longitude
                // index 1 is the latitude
                L.marker([location.coordinates[1], location.coordinates[0]])
                .bindPopup(data[i].descriptor).addTo(myMap);
            }
         }
    }
);