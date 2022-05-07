const request = require('request');
const constants = require('../config');

const { Navigator } = require("node-navigator");
const navigator = new Navigator();


const weatherData = (callback) => {
    // const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let lat = position.latitude;
        lat = Math.round((lat+Number.EPSILON) * 100) /100;
        let long = position.longitude;
        long = Math.round((long+Number.EPSILON) * 100) /100;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3709f89e826c2838310e77a773533f2d`
        request({url, json:true}, (error, {body})=> {
            if(error) {
                callback("Can't fetch data from open weather map api ", undefined)
            } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
                callback("Unable to find required data, try another location", undefined);
            } else {
                callback(undefined, {
                    temperature: body.main.temp,
                    description: body.weather[0].description,
                    cityName: body.name,
                    icon: body.weather[0].icon
                })
            }
        })
    });

}

module.exports = weatherData;