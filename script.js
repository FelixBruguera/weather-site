const city = document.querySelector('#data-city')
const count = document.querySelector('#data-country')
const temp = document.querySelector('#data-temp')
const humidity = document.querySelector('#data-humidity')
const weather = document.querySelector('#data-weather')
const wind = document.querySelector('#data-wind')
const dataDiv = document.querySelector('#data')
const userBotton = document.querySelector('#user-input')
const userInput = document.querySelector('input')

function callAPI(city) {
    const request = new XMLHttpRequest()
    request.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ce4998fdc9637ea68474a297f8d17084`, false);
    request.onload = function() {
        console.log(JSON.parse(request.responseText));
        jsonData = JSON.parse(request.responseText)};
    request.send();
    console.log('out of load')
    return jsonData;
};

function firstRun() {
    return city.textContent == 'City: ' ? true : false;
}

function clearData() {
    city.textContent = '';
    count.textContent = '';
    temp.textContent = '';
    humidity.textContent = 'Humidity: ';
    wind.textContent = 'Wind: ';
    weather.textContent = ''
}


function toCelsius(kelvin) {
    return (kelvin-273.15).toFixed(2)
};

function showTemp(main) {
    city.textContent += main.name;
    let flag = document.createElement('img')
    let flagName = document.createElement('figcaption')
    flag.src = `https://flagsapi.com/${main.sys.country}/flat/64.png`
    flagName.textContent = main.sys.country;
    count.appendChild(flag);
    count.appendChild(flagName);
    temp.textContent += `${toCelsius(main.main.temp)}°C`;
    humidity.textContent += `${main.main.humidity}%`;
    wind.textContent += `${main.wind.speed} m/s`;
    let weatherStatus = main.weather[0].main
    let weatherCode = main.weather[0].icon
    let figure = document.createElement('figure')
    let weatherIcon = document.createElement('img')
    let figcaption = document.createElement('figcaption')
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`
    figcaption.textContent = weatherStatus
    figure.appendChild(weatherIcon);
    figure.appendChild(figcaption);
    weather.appendChild(figure);
};

userBotton.addEventListener('click', function() {
    if (firstRun() == false) {clearData()};
    let call = callAPI(userInput.value);
    showTemp(call);
});


