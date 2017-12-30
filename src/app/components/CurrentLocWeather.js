import React from 'react';
import {weatherLocation} from '../services/WeatherService';


class CurrentLocWeather extends React.Component {
    constructor(props) {
        super (props);
    }

    state = {
        error: {
            msg: undefined
        },
        loc: {
            lat: undefined,
            long: undefined,
        },
        weatherData: undefined,
    };

    handleGetCurrentPositionError = (err) => {
        this.setState(() => (
            {
                error: {msg: "Location Access Blocked"}
            }
        ));
        (err && console.warn(`ERROR(${err.code}): ${err.message}`));
    };

    handleLocationWeatherError = (err) => {
        const {lat, long} = this.state.loc;
        console.warn (`failed to fetch weather for current location: {${lat}, ${long}, error: ${JSON.stringify(err)}`);
        this.setState(() => (
            {
                error: {msg: `failed to fetch weather data for current location: {${lat}, ${long}}`}
            }
        ));
    };

    handleLocationWeatherData = (weatherData) => {
        //console.log(`Weather data for (${latitude}, ${longitude}) : ${JSON.stringify(response)}`);
        const {name, main, weather, sys} = weatherData.data;
        this.setState(() => (
            {
                weatherData: {
                    name,
                    country: sys.country,
                    desc: weather[0].description,
                    curr: main.temp,
                    min: main.temp_min,
                    max: main.temp_max,
                },
            }
        ));
    };

    onGetCurrentPosition = (position) => {
        const {latitude, longitude} = position.coords;

        this.setState(() => (
            {
                loc: {
                    lat: Math.round(latitude),
                    long: Math.round(longitude),
                },
            }
        ));

        weatherLocation(Math.round(latitude), Math.round(longitude))
            .then(response => this.handleLocationWeatherData(response))
            .catch(err => this.handleLocationWeatherError(err));
    };

    componentDidMount = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.onGetCurrentPosition, this.handleGetCurrentPositionError);
        }
        else {
            this.handleGetCurrentPositionError()
        }
    };

    render= () => {
        const {lat, long} = this.state.loc;

        if (this.state.error.msg) {
            console.log(this.state.error.msg);
            return null;
        }

        /*if (!this.state.weatherData) return (
            <div className="current-loc-weather-container">fetching weather for your current location .. </div>
        );*/
        if (!this.state.weatherData) return null;
        const {name, country, desc, curr, min, max} = this.state.weatherData;
        return (
            <div className="current-loc-weather-container">
                <ul>
                    <li>Current Location: <b>{name}, {country}</b> </li>
                    <li><i className="fa fa-map-marker" aria-hidden="true"/> Latitude {lat}, Longitude {long}</li>
                    <li><i className="fa fa-check" aria-hidden="true"/> {desc}</li>
                    <li>
                        <i className="fa fa-thermometer-empty" aria-hidden="true"/> {curr}°C
                        ( <i className="fa fa-long-arrow-down" aria-hidden="true"/> {min}°C,
                        <i className="fa fa-long-arrow-up" aria-hidden="true"/> {max} °C )
                    </li>
                </ul>
            </div>
        );
    }
}


export default CurrentLocWeather;