let trace = {
    x: xData,
    y: yData
};

let data = [trace];

let layout = {
    title: "Basic Chart in Plotly"
};

// call Plotly.newPlot() to draw the plot in the id named 'plot'
Plotly.newPlot("plot", data, layout);