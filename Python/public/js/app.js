var fetchWeather = "/weather";

const weatherForm = document.getElementById('findWeather');
const search = document.querySelector('input');

let weatherImage = document.getElementById('weatherImage');

const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('click', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    //const locationApi = fetchWeather + "?address="+ search.value;
    const locationApi = fetchWeather + "?address=";

    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                
               //weatherIconDiv.container.innerHTML = `<img src=http://openweathermap.org/img/wn/${data.icon}@2x.png />`;
               weatherImage.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
                locationElement.textContent = data.cityName;
                tempElement.textContent = (1.8*(data.temperature-273) + 32).toFixed(1) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
            }
        }) 
    });
})