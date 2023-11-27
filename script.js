const city = document.querySelector('#data-city')
const count = document.querySelector('#data-country')
const temp = document.querySelector('#data-temp')
const humidity = document.querySelector('#data-humidity')
const weather = document.querySelector('#data-weather')
const wind = document.querySelector('#data-wind')
const dataDiv = document.querySelector('#data')
const userBotton = document.querySelector('#user-input')
const userInput = document.querySelector('input')
const currentTime = document.querySelector('#data-time')
const feel = document.querySelector('#data-feel')
const celsius = document.querySelector('#celsius')
const body = document.querySelector('body')

function callAPI(city) {
    const request = new XMLHttpRequest()
    request.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ce4998fdc9637ea68474a297f8d17084`, false);
    request.onload = function() {
        jsonData = JSON.parse(request.responseText)};
    request.send();
    return jsonData;
};

function firstRun() {
    return city.textContent == 'City: ' ? true : false;
}

function clearData() {
    city.textContent = '';
    count.textContent = '';
    temp.textContent = '';
    feel.textContent = 'Feels like: ';
    humidity.textContent = 'Humidity: ';
    wind.textContent = 'Wind: ';
    weather.textContent = '';
    currentTime.textContent = '';
    celsius.textContent = '°';
}


function toCelsius(kelvin) {
    return (kelvin-273.15).toFixed(2)
};

function showTemp(main) {
    if (main.cod == 404) {return city.textContent = main.message}
    let condition = main.weather.main;
    city.textContent += main.name;
    let flag = document.createElement('img')
    flag.src = `https://flagsapi.com/${main.sys.country}/flat/32.png`
    count.appendChild(flag);
    temp.textContent += `${toCelsius(main.main.temp)}`;
    feel.textContent += `${toCelsius(main.main.feels_like)}°`;
    humidity.textContent += `${main.main.humidity}%`;
    wind.textContent += `${main.wind.speed} m/s`;
    let weatherStatus = main.weather[0].description
    let weatherCode = main.weather[0].icon
    let figure = document.createElement('figure')
    let weatherIcon = document.createElement('img')
    let figcaption = document.createElement('figcaption')
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherCode}@4x.png`
    weatherIcon.classList.add('weather-icon')
    figcaption.textContent = weatherStatus
    figcaption.style.color = 'azure'
    figure.appendChild(weatherIcon);
    figure.appendChild(figcaption);
    weather.appendChild(figure);
    let unix = main.dt;
    let shift = main.timezone;
    let seconds = unix + shift;
    let miliseconds = seconds*1000
    let date = new Date(miliseconds).toUTCString();
    currentTime.textContent += date
};

userBotton.addEventListener('click', function() {
    if (firstRun() == false) {clearData()};
    let call = callAPI(userInput.value);
    showTemp(call);
});

body.addEventListener('keydown', function(e) {
    if (e.code != 'Enter') {return}
    if (firstRun() == false) {clearData()};
    let call = callAPI(userInput.value);
    showTemp(call);
});


