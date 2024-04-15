// API key for accessing OpenWeatherMap API
const API_KEY = `802101dc847b492d05b1cad58e048f1d`;

// Selecting necessary elements from the DOM
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

// Function to fetch weather data based on city
const getWeather = async(city) => {
    // Displaying loading message while fetching data
    weather.innerHTML = `<h2> Loading... <h2>`;

    // Constructing the URL for the API request
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Fetching data from the API
    const response = await fetch(url);
    const data = await response.json();

    // Displaying the weather data
    return showWeather(data);
}

// Function to display weather data
const showWeather = (data) => {
    // Checking if the city is not found
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`;
        return;
    }

    // Displaying weather information
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4> ${data.weather[0].main} </h4>
        </div>
    `;
}

// Adding event listener to the form for submitting city
form.addEventListener(
    "submit",
    function(event) {
        // Fetching weather data when form is submitted
        getWeather(search.value);
        // Preventing default form submission behavior
        event.preventDefault();
    }
);
