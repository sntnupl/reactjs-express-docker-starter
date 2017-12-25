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

    onGetCurrentPostion = (position) => {
        const {latitude, longitude} = position.coords;
        this.setState(() => (
            {
                loc: {
                    lat: Math.round(latitude),
                    long: Math.round(longitude),
                },
            }
        ));

        weatherLocation(Math.round(latitude), Math.round(longitude)).then(response => {
            //console.log(`Weather data for (${latitude}, ${longitude}) : ${JSON.stringify(response)}`);
            const {name, main, weather, sys} = response.data;
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

        }).catch(err => {
            console.warn (`failed to fetch weather for current location: {${latitude}, ${longitude}, error: ${JSON.stringify(err)}`);
            this.setState(() => (
                {
                    error: {msg: `failed to fetch weather data for current location: {${latitude}, ${longitude}`}
                }
            ));
        });
    };

    handleGetCurrentPositionError = (err) => {
        this.setState(() => (
            {
                error: {msg: "Location Access Blocked"}
            }
        ));
        (err && console.warn(`ERROR(${err.code}): ${err.message}`));
    };

    componentDidMount = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.onGetCurrentPostion, this.handleGetCurrentPositionError);
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
        if (!this.state.weatherData) return (
            <div>fetching weather for your current location .. </div>
        );

        const {name, country, desc, curr, min, max} = this.state.weatherData;
        return (
            <div>
                <p>Current Location: Latitude {lat}, Longitude {long}</p>
                <ul>
                    <li>Name: {name}</li>
                    <li>Country: {country}</li>
                    <li>Weather Condition: {desc}</li>
                    <li>Current Temp: {curr}</li>
                    <li>Max Temp: {max}</li>
                    <li>Min Temp: {min}</li>
                </ul>
            </div>
        );
    }
}


export default CurrentLocWeather;