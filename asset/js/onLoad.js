// when the page loads, get the weather for the most recent city in the history, 
// and display the history buttons

$(document).ready(function () {
    // clear the history div before populating it
    $("#history").empty();
    
    // get the history from local storage. if nothing there, default to Orlando
    let history = JSON.parse(localStorage.getItem("history")) || [];

    // if there is no history, get the weather for Orlando (default city)
    // else, get the weather for the most recent city
    if (history.length === 0) {
        getLatLon("Orlando"); 
    } else { 
        generateWeather(history[0].data);

        // display the history buttons
        for (let i = history.length - 1; i >= 0; i--) {
            addHistory(history[i].data);
        }
    }
});