import React from 'react';
import PropTypes from 'prop-types';
import {ForecastCity} from '../services/WeatherService';

const ForecastSummary = ({data, error}) => {
    if (error.msg) {
        return (
            <p>{error.msg}</p>
        );
    }

    if (!data) return null;
    const forecastItems = data.list.map((item) => {
        return (
            <div className="forecast-card" key={item.dt.toString()}>
                <ul className="forecast-card-date">
                    <li>Date: {item.dt_txt}</li>
                    <li>Weather: {item.weather[0].description}</li>
                    <li>Temperature: {item.main.temp}</li>
                    <li>Min Temperature: {item.main.temp_min}</li>
                    <li>Temperature: {item.main.temp_max}</li>
                </ul>
            </div>
        );
    });
    return (
        <div className="weather-forecasts">
            <div>Location: {data.name}</div>
            <div>Country: {data.country}</div>
            {forecastItems}
        </div>
    );
};


ForecastSummary.propTypes = {
    error: PropTypes.shape({
        msg: PropTypes.string
    }),
    data: PropTypes.shape({
        name: PropTypes.string,
        country: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.object),
    }),
};


class CurrentForecast extends React.Component {
    static Summary = ForecastSummary;

    constructor(props) {
        super(props);
    }

    refCity = null;
    state = {
        error: {
            msg: undefined
        },
        isFetchingData: false,
        forecastData: undefined,
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.refCity.value) return;

        this.setState(() => {
            return {
                error: {msg: undefined},
                isFetchingData: true,
                forecastData: undefined,
            };
        });

        const location = this.refCity.value;
        ForecastCity(location.trim()).then((resp) => {
            //console.log(`Forecast for ${location.trim()}: ${JSON.stringify(resp)}`);
            const {name, country} = resp.data.city;
            this.setState(() => (
                {
                    isFetchingData: false,
                    forecastData: {
                        name,
                        country,
                        list: resp.data.list,
                    }
                }
            ));
        }).catch((err) => {
            console.error(`error: ${JSON.stringify(err)}`);
            this.setState(() => (
                {
                    isFetchingData: false,
                    error: {
                        msg: 'failed to fetch forecast'
                    }
                }
            ));
        });
    };

    render = () => {
        const {isFetchingData, error, forecastData} = this.state;

        return (
            <div className="forecast">
                <div className="forecast-form">
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            ref={(el) => {this.refCity = el}}
                            placeholder="city name (, country name)"/>
                        {!isFetchingData
                            ? <button type="submit">Fetch Weather Forecast</button>
                            : <button type='submit' disabled>Fetching..</button>
                        }
                    </form>
                </div>
                <ForecastSummary error={error} data={forecastData} />
            </div>
        );
    };

}


export default CurrentForecast;