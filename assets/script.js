//Apply DOM elements
let userFormEl = document.querySelector("#user-form");
let cityInputEl = document.querySelector("#city-input");
let cityContEl = document.querySelector("#city-container");
let citySearch = document.querySelector("#city-search-term");
let currWeather = document.querySelector("#current-weather");
let prevCityEl = document.getElementById("search-container");
let fiveDayEl = document.querySelector("#forecast-cards");
let currUvEl = document.querySelector("#uv-input")
//Setting up API key variable
const apiKey="7576ce087c081c6350efa666e9fea33c"
let cityArr = [];
//Setting up the search form and submission
const formSubmitHandler = function(event) {
    event.preventDefault();
    let city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        getForecast(city);
        cityArr.push(city);
        localStorage.setItem("city", JSON.stringify(cityArr));
        cityInputEl.value = "";
     } else {
        alert("Please enter a City name");
    }
};
//Request the current weather API
const getCityWeather = function(city) {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    console.log(apiURL);
    //Fetch API if the request is successful
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                disCityWeather(data, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    //Alert if error
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
}
//Request UV API
const searchCityUV = function(lon, lat, city) {
    let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
    fetch(uvUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(lon, lat, city) {
                disCurrUv(lon, lat, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
        })
        //Alert if error
        .catch(function(error) {
            alert("Unable to connect to Open Weather");
    })
};
// Displaying current weather data
const disCityWeather = function(city, searchTerm) {
    cityContEl.textContent = "";
    citySearch.textContent = searchTerm;
    let disCurrDate = document.querySelector("#city-current-date");
    let currDate = moment();
    disCurrDate.textContent = currDate.format("(L)");
    //Variables to display weather icons
    let disIcon = document.querySelector("#city-current-icon");
    let currIcon = "https://openweathermap.org/img/wn/" + city.weather[0].icon + "@2x.png"
    disIcon.setAttribute ("src", currIcon);
    //Variables to display temperature
    let disTemp = document.querySelector("#temp-input");
    let currTemp = Math.round(city.main.temp) + " °F";
    disTemp.textContent = currTemp;
    //Variables to display humidity
    let disHumidity = document.querySelector("#humidity-input");
    let currHumidity = city.main.humidity + "%";
    disHumidity.textContent = currHumidity;
    //Variables to display wind
    let disWind = document.querySelector("#wind-input");
    let currWind = city.wind.speed + " MPH";
    disWind.textContent = currWind;
    //Variables to display the list of items
    let newCityEl = document.createElement("li");
    newCityEl.className = "list-group-item";
    newCityEl.textContent = searchTerm;
    newCityEl.addEventListener("click", clickHandler);
    prevCityEl.appendChild(newCityEl);
     //Longitude and Lattitude for UV Index
     let lon = city.coord.lon;
     let lat = city.coord.lat;
     searchCityUV(lon, lat, city);
};
//Show UV
const disCurrUv = function(data) {
    let uv = data.value;
    if (uv > 8) {
        currUvEl.classList="badge badge-danger"
        currUvEl.innerHTML=" " + uv + " ";
    } else if (uv <= 6 ) {
        currUvEl.classList="badge badge-warning"
        currUvEl.innerHTML=" " + uv + " ";
    } else {
        currUvEl.classList="badge badge-success"
        currUvEl.innerHTML=" " + uv + " ";
    }
};
//Five day forecast
const getForecast = function(city) {
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + apiKey;
    console.log(forecastURL);
    fetch(forecastURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                disForecast(data.list);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    //Alert if error
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
    
};
//Show five day forecast
const disForecast = function (list) {
    console.log(list);
        for (var i = 0; i <= 4; i++) {
        //Show dates
        let disDate1 = document.querySelector("#date-0");
        let forecastDate1 = moment().add(1, "days").format("L");
        disDate1.textContent = forecastDate1;
        let disDate2 = document.querySelector("#date-1");
        let forecastDate2 = moment().add(2, "days").format("L");
        disDate2.textContent = forecastDate2;
        let disDate3 = document.querySelector("#date-2");
        let forecastDate3 = moment().add(3, "days").format("L");
        disDate3.textContent = forecastDate3;
        let disDate4 = document.querySelector("#date-3");
        let forecastDate4 = moment().add(4, "days").format("L");
        disDate4.textContent = forecastDate4;
        let disDate5 = document.querySelector("#date-4");
        let forecastDate5 = moment().add(5, "days").format("L");
        disDate5.textContent = forecastDate5;
        //Show temperatures
        let disTemp = document.querySelector(`#temp-${i}`);
        let forecastTemp = list[i].main.temp + " °F";
        disTemp.textContent = forecastTemp;
        //Show humidity
        let disHumidity = document.querySelector(`#humidity-${i}`);
        let forecastHumidity = list[i].main.humidity + "%";
        disHumidity.textContent = forecastHumidity;
        //Show weather icons
        let disIcon1 = document.querySelector("#city-icon-1");
        let currIcon1 = "https://openweathermap.org/img/wn/" + list[1].weather[0].icon + "@2x.png"
        disIcon1.setAttribute ("src", currIcon1);
        let disIcon2 = document.querySelector("#city-icon-2");
        let currIcon2 = "https://openweathermap.org/img/wn/" + list[2].weather[0].icon  + "@2x.png"
        disIcon2.setAttribute ("src", currIcon2);
        let disIcon3 = document.querySelector("#city-icon-3");
        let currIcon3 = "https://openweathermap.org/img/wn/" + list[3].weather[0].icon  + "@2x.png"
        disIcon3.setAttribute ("src", currIcon3);
        let disIcon4 = document.querySelector("#city-icon-4");
        let currIcon4 = "https://openweathermap.org/img/wn/" + list[4].weather[0].icon  + "@2x.png"
        disIcon4.setAttribute ("src", currIcon4);
        let disIcon5 = document.querySelector("#city-icon-5");
        let currIcon5 = "https://openweathermap.org/img/wn/" + list[5].weather[0].icon  + "@2x.png"
        disIcon5.setAttribute ("src", currIcon5);
        }
};
//Click on formerly searched city
const clickHandler = function (event) {
    let clickCity = event.currentTarget.textContent;
    getCityWeather(clickCity);
    getForecast(clickCity);
};
//Activate search button
userFormEl.addEventListener("submit", formSubmitHandler);