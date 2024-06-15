const API_KEY = "950568ca8ba77b218222e73059c2fc24";
const StateCode = "FL";
const CountryCode = "US";

// get the lat and lon of a city
const getLatLon = (cityName) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${StateCode},${CountryCode}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            getWeatherData(data[0].lat, data[0].lon);
        })
        .catch(error => console.error(error));
} 

// get weather data from openweathermap API using lat and lon
const getWeatherData = (lat, lon) => {
    lat = lat.toFixed(2);
    lon = lon.toFixed(2);
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            generateWeather(data);
        })
        .catch(error => console.error(error));
}

// fill out the weather card and the 5 day forecast
const generateWeather = (data) => {
    $("#main-title").text(data.city.name);
    $("#main-icon").attr("src", `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);
    let temp = Math.round((data.list[0].main.temp - 273.15) * 9/5 + 32);
    $("#main-temp").text("Temp: " + temp + "°F");
    $("#main-wind").text("Wind: " + data.list[0].wind.speed + "MPH");
    $("#main-humidity").text("Humidity: " + data.list[0].main.humidity + "%");

    // loop through the 5 day forecast
    for (let i = 1; i < 6; i++) {
        $(`#${i}`).find(".date").text(data.list[i].dt_txt);
        $(`#${i}`).find(".icon").attr("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`);
        let temp = Math.round((data.list[i].main.temp - 273.15) * 9/5 + 32);
        $(`#${i}`).find(".temp").text("Temp: " + temp + "°F");
        $(`#${i}`).find(".wind").text("Wind: " + data.list[i].wind.speed + "MPH");
        $(`#${i}`).find(".humidity").text("Humidity: " + data.list[i].main.humidity + "%");
    }   
}

