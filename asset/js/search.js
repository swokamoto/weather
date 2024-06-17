// button click events

// look up the lat and lon of a city and get the weather data
$("#search-city").on("click", function (event) {
    event.preventDefault();
    getLatLon($("#city").val());
});

// using the stored 'data-info' attribute, display the weather from the history
$("#history").on("click", "button", function () {
    generateWeather($(this).data("info"));
});

// when the page loads, get the weather for the most recent city in the history, 
// and display the history buttons
$(document).ready(function () {
    // clear the history div before populating it
    $("#history").empty();
    
    // get the history from local storage. if nothing there, default to Orlando
    let history = JSON.parse(localStorage.getItem("history")) || [];
    if (history.length === 0) {
        getLatLon("Orlando");
        return;
    }

    // get the weather for the most recent city in the history
    generateWeather(history[0].data);

    // i want the most recent city searched for to be displayed first
    for (let i = history.length - 1; i >= 0; i--) {
        addHistory(history[i].data);
    }
});