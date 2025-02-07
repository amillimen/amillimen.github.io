let trace1 = {
    x: [0, 1, 2, 3, 4, 5],
    y: [0, 5, 10, 15, 20, 25],
    type: "bar"
  };

let trace2 = {
    x: [0, 1, 2, 3, 4, 5],
    y: [0, 1, 4, 9, 16, 25],
    type: "scatter"
  };

// make a data list that contains the traces
let data = [trace1, trace2];

// call Plotly.NewPlot() to put the visual in "plot1"
Plotly.newPlot("plot1", data);