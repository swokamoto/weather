// button click events

// look up the lat and lon of a city and get the weather data
$("#search-city").on("click", function (event) {
    event.preventDefault(); 
    // prevent the form from submitting, which would refresh the page
    getLatLon($("#city").val());
    // clear the input field
    $("#city").val("");
});

// using the stored 'data-info' attribute, display the weather from the history
$("#history").on("click", "button", function () {
    generateWeather($(this).data("info"));
});