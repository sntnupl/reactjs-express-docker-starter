import React from 'react';
import PropTypes from 'prop-types';
import {weatherCity} from '../services/WeatherService';

const WeatherSummary = ({data, error}) => {
    const {name, desc, curr, min, max} = data;
    if (!name) return null;
    if (error.msg) return null;
    return (
        <div className="weather-data-card">
            <p>{name}</p>
            <ul>
                <li>Current Weather: {desc}</li>
                <li>Current Temp: {curr} deg celcius</li>
                <li>Min Temp: {min} deg celcius</li>
                <li>Max Temp: {max} deg celcius</li>
            </ul>
        </div>
    );
};

WeatherSummary.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        desc: PropTypes.string,
        curr: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
    }),
    error: PropTypes.shape({
        msg: PropTypes.string,
    }),
};

class CurrentWeather extends React.Component {
    static Summary = WeatherSummary;
    static defaultProps = {
        onData: () => {}
    };

    constructor(props) {
        super(props);
    }
    state = {
        error: {
            msg: undefined
        },
        isFetchingData: false,
        weatherData: {
            name: undefined,
            desc: undefined,
            curr: undefined,
            min: undefined,
            max: undefined
        },
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.refs.locationText.value) return;

        this.setState(() => {
            return {
                error: {msg: undefined},
                isFetchingData: true,
            };
        });

        const location = this.refs.locationText.value;
        weatherCity(location.trim()).then(resp => {
            const {main, weather, name} = resp.data;
            this.setState(() => {
                return {
                    isFetchingData: false,
                    weatherData: {
                        name,
                        desc: weather[0].description,
                        curr: main.temp,
                        min: main.temp_min,
                        max: main.temp_max
                    },
                };
            });

            this.refs.locationText.value = '';
            this.props.onData(resp);
        }).catch(err => {
            console.error('CurrentData error: ', JSON.stringify(err));
            this.setState(() => {
                return {
                    error: {msg: 'api call failed'},
                    isFetchingData: false
                };
            });
        });
    };

    render = () => {
        const {error, isFetchingData, weatherData} = this.state;
        const children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                error,
                data: weatherData,
            });
        });

        return (
            <div className="current-weather">
                <div className="current-weather-form">
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            ref="locationText"
                            placeholder="city name (, country name)"/>
                        {!isFetchingData
                            ? <button type="submit">Fetch Weather Data</button>
                            : <button type='submit' disabled>Fetching..</button>
                        }
                        <span>{error.msg}</span>
                    </form>
                </div>
                {children}
            </div>
        );
    }
}

CurrentWeather.propTypes = {
    onData: PropTypes.func,
};

export default CurrentWeather;