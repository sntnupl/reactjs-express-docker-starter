import axios from 'axios';

const WEATHER_API_URL_BASE  = `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${WEATHER_API_KEY}`;
const FORECAST_API_URL_BASE  = `http://api.openweathermap.org/data/2.5/forecast?units=metric&APPID=${WEATHER_API_KEY}`;

export const weatherCity = (city) => {
    const url = `${WEATHER_API_URL_BASE}&q=${city}`;

    return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            resolve(response);
        }).catch((err) => {
            console.error(`Failed to fetch weather data for ${city}, error: ${JSON.stringify(err)}`);
            reject(err);
        });
    });
};

export const weatherLocation = (lat, long) => {
    const url = `${WEATHER_API_URL_BASE}&lat=${lat}&lon=${long}`;
    return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err);
        });
    });
};


export const ForecastCity = (city) => {
    const url = `${FORECAST_API_URL_BASE}&q=${city}`;

    return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err);
        })
    });
};


