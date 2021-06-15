function optionChange(id) {
    makePlots(id);
    demInfo(id);
};

//Create function to grab names and populate dropdown
function init() {
    //Select dropdown 
    var dropdown = d3.select("#selDataset");

    //read json data
    d3.json("./samples.json").then((data) => {
        console.log(data)

        data.names.forEach((people) => {
            dropdown.append("option")
                .text(people)
                .property("value");
        });
        //Call data and info functions to display on page
        makePlots(data.names[0]);
        demInfo(data.names[0]);
    });
}
init();

function makePlots(id) {
    //read json data
    d3.json("./samples.json").then((data) => {
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
        var layout = {
            title: "Top 10 Bacteria Cultures Found"
        };
        Plotly.newPlot("bar", trace1, layout);

        //Get values for bubble chart
        var ids = data.otu_labels;
        var samValues = data.sample_values;
        var labels = data.otu_labels;

        //Create trace2
        var trace2 = {
            text: labels,
            x: ids,
            y: samValues,
            marker: {
                color: ids,
                size: samValues
            }
        };
        var layout = {
            title: "Bacteria Cultures Per Sample",
            xlable: "OTU ID"
        };
    });
}
function demInfo(id) {

}