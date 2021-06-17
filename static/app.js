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
        var metadata = data.metadata[0];
        demInfo(metadata);
        makePlots(sample); 
        buildGauge(metadata);
    });
};
init();

function makePlots(data) {
    //read json data
        console.log(data)

        //Get data for values, labels, and hovertext
        var sampleValues = data.sample_values.slice(0,10).reverse();
        var otuId = data.otu_ids.map(d => "OTU " + d).slice(0,10).reverse();
        var otuLabels = data.otu_labels.reverse();

        //Create trace1
        var trace1 = [{
            text: otuLabels,
            type: "bar",
            x: sampleValues,
            y: otuId,
            orientation: "h"
        }];
        //Fix layout
        var layout1 = [{
            title: "Top 10 Bacteria Cultures Found"
        }];
        Plotly.newPlot("bar", trace1, layout1);

        //Get values for bubble chart
        var ids = data.otu_ids;
        var samValues = data.sample_values;
        var labels = data.otu_labels;

        //Create trace2
        var trace2 = [{
            text: labels,
            x: ids,
            y: samValues,
            mode: "markers",
            marker: {
                color: ids,
                size: samValues
            }
        }];
        var layout2 = [{
            title: "Bacteria Cultures Per Sample",
            xaxis: "OTU ID",
            width: 1200
        }];
        Plotly.newPlot("bubble", trace2, layout2);

        // Get freq value
        // var wfreq = data.metadata.wfreq;
        //var wfreq = metadata.wfreq;
        //var trace3 = [{
            //domain: {
                //x: [0,1], 
                //y: [0,1]
            //},
            //value: wfreq,
            //title: { text: "Scrubs per Week"},
            //type: "indicator",
            //mode: "gauge+number"
        //}];
        //var layout3 = [{
            //width: 600,
            //height: 450,
            //margin: {t:0, b:0}
        //}];
        //Plotly.newPlot("gauge", trace3, layout3);
};
function demInfo(id) {
        //Select demographic table and clear it
        var demdata = d3.select("#sample-metadata");
        demdata.html("");

        //go through and grab data
        Object.entries(id).forEach(([key, value]) => {
            demdata.append("h5").text(`${key}: ${value}`)
        });
};
function buildGauge(wfreq) {
    var level = parseFloat(wfreq) * 20

    var data = [
        {
            domain: {
                x: [0,1],
                y: [0,1]
            },
            value: wfreq,
            title: { text: "Scrubs per Week"},
            type: "indicator",
            mode: "gauge",
            gauge: {
                axis: [0, 9],
                bar: {color: "red"},
                steps:
                [
                    {range: [0,1], color: "rgba(0, 100, 100, 100)" },
                    {range: [1,2], color: "rgba(100, 100, 100, 100)" },
                    {range: [2,3], color: "rgba(100, 100, 100, 100)" },
                    {range: [3,4], color: "rgba(100, 100, 100, 100)" },
                    {range: [4,5], color: "rgba(100, 100, 100, 100)" },
                    {range: [5,6], color: "rgba(100, 100, 100, 100)" },
                    {range: [6,7], color: "rgba(100, 100, 100, 100)" },
                    {range: [7,8], color: "rgba(100, 100, 100, 100)" },
                    {range: [8,9], color: "rgba(100, 100, 100, 100)" },
                ],
                threshold: {
                    //line: {color: "purple", width = 7},
                    thickness: .75,
                    value: wfreq
                }
            }
    }
    ]
    var layout = {}
    Plotly.newPlot("gauge", data, layout)
};
function optionChanged(id) {
    d3.json("./samples.json").then(function(data) {
        var filterid = data.samples.filter(d => d.id.toString() === id);
        makePlots(filterid[0]);
        var results = data.metadata.filter(d => d.id.toString() === id);
        demInfo(results[0]);
        buildGauge(results[0]);
    });
}
