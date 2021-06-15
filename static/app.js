function optionChange(id) {
    barPlot(id);
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
        barPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}
init();

function BarPlot(id) {
    //read json data
    d3.json("./sample.json").then((data) => {
        console.log(data)

        //Get data for values, labels, and hovertext
        var sampleValues = data.samples_values.slice(0,10).reverse();
        var otuId = data.otu_ids.slice(0,10).reverse();
        var otuLabels = data.otu_labels.reverse();

        //Create trace
        var trace1 = {
            text: otuLabels,
            type: "bar",
            x: sampleValues,
            y: otuId,
            orientation: "h"
        }
    });
    //Fix layout
    var layout = {
        title: "Top 10 Bacteria Cultures Found"
    }
    Plotly.newPlot("bar", trace1, layout);
}