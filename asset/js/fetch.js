const API_KEY = "950568ca8ba77b218222e73059c2fc24";

// get the lat and lon of a city using the Geocoder API
const getLatLon = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)    
    .then(response => response.json())
    .then(data => {
        getWeatherData(data.city.coord.lat, data.city.coord.lon);
    })
    .catch(error => {
        alert("City not found. Please try again.");
    });
} 

// get weather data from openweathermap API using lat and lon
const getWeatherData = (lat, lon) => {
    lat = lat.toFixed(2);
    lon = lon.toFixed(2);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            generateWeather(data); // fill out the weather card and the 5 day forecast
        })
        .catch(error => console.error(error));
}