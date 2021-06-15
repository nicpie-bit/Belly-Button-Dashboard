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