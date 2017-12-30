import React from 'react';
import PropTypes from 'prop-types';
import {ForecastCity} from '../services/WeatherService';

const ForecastSummary = ({data, error}) => {
    if (error && error.msg) {
        return (
            <p>{error.msg}</p>
        );
    }

    if (!data) return null;
    const forecastItems = data.list.map((item) => {
        return (
            <div className="forecast-card" key={item.dt.toString()}>
                <ul>
                    <li>{item.dt_txt}</li>
                    <li><i className="fa fa-check" aria-hidden="true"/> {item.weather[0].description}</li>
                    <li><i className="fa fa-thermometer-empty" aria-hidden="true"/> {item.main.temp} deg celcius</li>
                </ul>
            </div>
        );
    });
    return (
        <div className="forecast-card-container">{forecastItems}</div>
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

/*
export const getForecastFirstData = (loc) => {
    return ForecastCity(loc).then((resp) => {
        return {
            cityName: resp.data.city.name,
            data: {
                temp: resp.data.list[0].main.temp,
                min: resp.data.list[0].main.temp_min,
                max: resp.data.list[0].main.temp_max,
            }
        };
    }).catch((err) => {
        return err.msg;
    });
};
*/


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

    handleForecastData = (forecast) => {
        //console.log(`Forecast for ${location.trim()}: ${JSON.stringify(resp)}`);
        if (this.refCity) this.refCity.value = '';
        const {name, country} = forecast.data.city;
        this.setState(() => (
            {
                isFetchingData: false,
                forecastData: {
                    name,
                    country,
                    list: forecast.data.list,
                }
            }
        ));
    };

    handleForecastError = (err) => {
        console.warn(`error: ${JSON.stringify(err)}`);
        this.setState(() => (
            {
                isFetchingData: false,
                error: {
                    msg: 'failed to fetch forecast'
                }
            }
        ));
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
        ForecastCity(location.trim())
            .then(resp => this.handleForecastData(resp))
            .catch(err => this.handleForecastError(err));
    };

    render = () => {
        const {isFetchingData, error, forecastData} = this.state;

        return (
            <div className="forecast">
                <div className={forecastData ? "forecast-form-secondary" : "forecast-form-primary"}>
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            ref={(el) => {this.refCity = el}}
                            placeholder="city name (, country name)"/>
                        {!isFetchingData
                            ? <button type="submit">Submit</button>
                            : <button type='submit' disabled>Fetching..</button>
                        }
                    </form>
                </div>
                {forecastData &&
                    <div className="forecast-location">
                        <p>Weather Forecast: <b>{forecastData.name}, {forecastData.country}</b></p>
                    </div>
                }
                <ForecastSummary error={error} data={forecastData} />
            </div>
        );
    };

}


export default CurrentForecast;