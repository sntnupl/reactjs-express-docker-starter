import React from 'react';
import PropTypes from 'prop-types';

const WeatherData = (props) => {
    if (!props.info) return (<span/>);

    const {main, weather, name} = props.info.data;
    return (
        <div className="weather-data-card">
            <p>{name}</p>
            <ul>
                <li>Current Weather: {weather[0].description}</li>
                <li>Current Temp: {main.temp} deg celcius</li>
                <li>Min Temp: {main.temp_min} deg celcius</li>
                <li>Max Temp: {main.temp_max} deg celcius</li>
            </ul>
        </div>
    );
};

WeatherData.propTypes = {
    info: PropTypes.object,
    /*optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),*/
};

export default WeatherData;