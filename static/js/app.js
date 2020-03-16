function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json("data/samples.json").then((data)=> {
    console.log(data)

    // Use d3 to select the panel with id of `#sample-metadata`
    let selectManipulatePanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    selectManipulatePanel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
            selectManipulatePanel.append("h6").text(`${key}:${value}`);
        });
    });
};
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {

    let otu_ids = data.otu_ids;
    let otu_labels = data.otu_labels;
    let sample_values = data.sample_values;    
    // @TODO: Build a Bubble Chart using the sample data
    let bubbleChartData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Picnic"
        }
      }
    ];

    let bubbleChartLayout = {
      margin: { t: 0 },
      hovermode: "closests",
      xaxis: { title: "OTU ID"}
    };

    Plotly.plot("bubble", bubbleChartData, bubbleChartLayout);
});
};

function init() {

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    let pieChartData = [
      {
        values: sample_values.slice(0, 10),
        labels: otu_ids.slice(0, 10),
        hovertext: otu_labels.slice(0, 10),
        hoverinfo: "hovertext",
        colorscale: "Picnic",
        type: "pie"
      }
    ];
    
    let pieChartLayout = {
      margin: { t: 0, l: 0 }
    };

    Plotly.plot("pie", pieChartData, pieChartLayout);
function init() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
}
init();