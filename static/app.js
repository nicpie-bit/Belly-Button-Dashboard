//Create function to grab names and populate dropdown
function init() {
    //Select dropdown 
    var dropdown = d3.select("#selDataset");

    //read json data
    d3.json("./samples.json").then(function(data) {
        console.log(data)

        data.names.forEach((people) => {
            dropdown.append("option")
                .text(people)
                .property("value");
        });
        //Call data and info functions to display on page
        var sample = data.samples[0];
        makePlots(sample);
        var metadata = data.metadata[0];
        demInfo(metadata)
    });
}
init();

function makePlots(data) {
    //read json data
        console.log(data)

        //Get data for values, labels, and hovertext
        var sampleValues = data.sample_values.slice(0,10).reverse();
        var otuId = data.otu_ids.map(d => "OTU " + d).slice(0,10).reverse();
        var otuLabels = data.otu_labels.reverse();

        //Create trace1
        var trace1 = {
            text: otuLabels,
            type: "bar",
            x: sampleValues,
            y: otuId,
            orientation: "h"
        };
        //Fix layout
        var layout1 = {
            title: "Top 10 Bacteria Cultures Found"
        };
        Plotly.newPlot("bar", trace1, layout1);

        //Get values for bubble chart
        var ids = data.otu_labels;
        var samValues = data.sample_values;
        var labels = data.otu_labels;

        //Create trace2
        //var trace2 = {
            //text: labels,
            //x: ids,
            //y: samValues,
            //mode: "markers",
            //marker: {
                //color: ids,
                //size: samValues
            //}
        //};
        //var layout2 = {
            //title: "Bacteria Cultures Per Sample",
            //xaxis: {title: "OTU ID"},
            //height: 600,
            //width: 1000
        //};
        //Plotly.newPlot("bubble", trace2, layout2)
}
function demInfo(id) {
        //Select demographic table and clear it
        var demdata = d3.select("#sample-metadata");
        demdata.html("");

        //go through and grab data
        Object.entries(id).forEach(([key, value]) => {
            demdata.append("h5").text(`${key}: ${value}`)
        });
}
function optionChanged(id) {
    d3.json("./samples.json").then(function(data) {
        var filterid = data.samples.filter(d => d.id.toString() === id);
        makePlots(filterid[0]);
        var results = data.metadata.filter(d => d.id.toString() === id);
        demInfo(results[0]);
    });
};
