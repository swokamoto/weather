// fill out the weather card and the 5 day forecast
const generateWeather = (data) => {
    selectedCityWeather(data)   // fill out the main weather card
    fiveDayForecast(data)       // fill out the 5 day forecast
    addToHistory(data)          // add the city to the history in local storage
}


// fill out the main weather card
const selectedCityWeather = (data) => { 
    let cityNameAndDate = data.city.name + " " + new Date(data.list[0].dt_txt).toLocaleDateString();
    let weatherIcon = data.list[0].weather[0].icon;
    let temperature = "Temp: " + Math.round((data.list[0].main.temp - 273.15) * 9/5 + 32) + "°F";
    let windSpeed = "Wind: " + data.list[0].wind.speed + "MPH";
    let humidity = "Humidity: " + data.list[0].main.humidity + "%";
    
    $("#main-title").text(cityNameAndDate);
    $("#main-icon").attr("src", `http://openweathermap.org/img/wn/${weatherIcon}.png`);
    $("#main-temp").text(temperature);
    $("#main-wind").text(windSpeed);
    $("#main-humidity").text(humidity);
}

// fill out the 5 day forecast
const fiveDayForecast = (data) => {
    for (let i = 1; i < 6; i++) { 
    
        let date = new Date(data.list[i].dt_txt).toLocaleDateString();
        let weatherIcon = data.list[i].weather[0].icon;
        let temperature = "Temp: " + Math.round((data.list[i].main.temp - 273.15) * 9/5 + 32) + "°F";
        let windSpeed = "Wind: " + data.list[i].wind.speed + "MPH";
        let humidity = "Humidity: " + data.list[i].main.humidity + "%";

        $(`#${i}`).find(".date").text(date);
        $(`#${i}`).find(".icon").attr("src", `http://openweathermap.org/img/wn/${weatherIcon}.png`);
        $(`#${i}`).find(".temp").text(temperature);
        $(`#${i}`).find(".wind").text(windSpeed);
        $(`#${i}`).find(".humidity").text(humidity);
    }
}

// add the city to the history in local storage
const addToHistory = (data) => {
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
    } else { // if city is already in history, replace the data
        city.data = data;
        localStorage.setItem("history", JSON.stringify(history));
        // update the data-info attribute of the button
        let button = $(`button:contains(${data.city.name})`);
        button.data("info", data);
    }
}

// add a button to the history div
// used during onLoad.js to populate the history div
const addHistory = (data) => {
    let button = $('<button type="submit" class="btn btn-info">').text(data.city.name);
    button.data("info", data);
    $("#history").prepend(button);
}