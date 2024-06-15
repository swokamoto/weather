// button click events

$("#search-city").on("click", function (event) {
    event.preventDefault();
    getLatLon($("#city").val());
});
