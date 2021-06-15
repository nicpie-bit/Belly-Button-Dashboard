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
        var sample = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(sample);

        var sampleValues = sample.sample_values.slice(0,10).reverse();
        var otuId = sample.otu_ids.map(d => "OTU " + d).slice(0,10).reverse();
        var otuLabels = sample.otu_labels.reverse();

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
        var ids = sample.otu_labels;
        var samValues = sample.sample_values;
        var labels = sample.otu_labels;

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
        var layout2 = {
            title: "Bacteria Cultures Per Sample",
            xlable: "OTU ID"
        };
        Plotly.newPlot("bubble", trace2, layout2)
    });
}
function demInfo(id) {

}