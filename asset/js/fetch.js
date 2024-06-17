// When the search button is clicked, the functions run in a specific order. 
// 1st getLatLon(cityName), fetches the latitude and longitude of the city. 
// 2nd getWeatherData(lat,lon), fetches the weather data. 
// 3rd generateWeather(data), populates the weather card and the 5-day forecast.

const API_KEY = "950568ca8ba77b218222e73059c2fc24";

// get the lat and lon of a city using the Geocoder API
const getLatLon = (cityName) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)    
    .then(response => response.json())
    .then(data => {
        getWeatherData(data.city.coord.lat, data.city.coord.lon);
    })
    .catch(alert("City not found"));
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
    // fill out the main-title with name and date
    $("#main-title").text(data.city.name + " " + new Date(data.list[0].dt_txt).toLocaleDateString());
    $("#main-icon").attr("src", `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);
    let temp = Math.round((data.list[0].main.temp - 273.15) * 9/5 + 32);
    $("#main-temp").text("Temp: " + temp + "°F");
    $("#main-wind").text("Wind: " + data.list[0].wind.speed + "MPH");
    $("#main-humidity").text("Humidity: " + data.list[0].main.humidity + "%");

    // loop through the 5 day forecast
    for (let i = 1; i < 6; i++) {
        let date = new Date(data.list[i].dt_txt);
        $(`#${i}`).find(".date").text(date.toLocaleDateString());
        $(`#${i}`).find(".icon").attr("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`);
        let temp = Math.round((data.list[i].main.temp - 273.15) * 9/5 + 32);
        $(`#${i}`).find(".temp").text("Temp: " + temp + "°F");
        $(`#${i}`).find(".wind").text("Wind: " + data.list[i].wind.speed + "MPH");
        $(`#${i}`).find(".humidity").text("Humidity: " + data.list[i].main.humidity + "%");
    }   

    //if the city is not in the history, add it to the history
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let city = history.find(city => city.name === data.city.name);
    if (city === undefined) {
        let cityStore = {
            name: data.city.name,
            data: data
        };
        history.unshift(cityStore);
        localStorage.setItem("history", JSON.stringify(history));
        addHistory(data);
    }

}

// add a button to the history div
const addHistory = (data) => {
        let button = $('<button type="submit" class="btn btn-info">').text(data.city.name);
        button.data("info", data);
        $("#history").prepend(button);
}