import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
jest.mock('../../services/WeatherService');
import CurrentForecast from '../../components/CurrentForecast';
//import CurrentForecast, {getForecastFirstData} from '../../components/CurrentForecast';


const dataForecast = {
    data: {
        city: {
            name: 'Kolkata',
            country: 'IN'
        },
        list: [
            {
                dt_txt: '2017-12-27 09:00',
                dt: 14008327,
                main: {
                    temp: 14,
                    temp_min: 12,
                    temp_max: 25,
                },
                weather: [{description: 'haze'}],
            }, {
                dt_txt: '2017-12-27 12:00',
                dt: 14008327,
                main: {
                    temp: 18,
                    temp_min: 12,
                    temp_max: 25,
                },
                weather: [{description: 'mist'}],
            }, {
                dt_txt: '2017-12-27 15:00',
                dt: 14008327,
                main: {
                    temp: 21,
                    temp_min: 12,
                    temp_max: 25,
                },
                weather: [{description: 'sunny'}],
            },
        ],
    }
};

test('should render CurrentForecast correctly', () => {
    const wrapper = shallow(<CurrentForecast/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should disable submit button once forecast starts getting fetched', () => {
    const wrapper = shallow(<CurrentForecast/>);
    expect(wrapper.find('button [disabled]').length).toBe(0);
    wrapper.setState({ isFetchingData: true });
    expect(wrapper.find('button [disabled]').length).toBe(1);
});

test('should handle forecast data', () => {
    const wrapper = shallow(<CurrentForecast/>);
    wrapper.setState({
        isFetchingData: true,
        forecastData: undefined,
    });

    wrapper.instance().handleForecastData(dataForecast);

    expect(wrapper.state().isFetchingData).toEqual(false);
    expect(wrapper.state().forecastData).toBeDefined();
});

test('should handle forecast error', () => {
    const wrapper = shallow(<CurrentForecast/>);
    wrapper.setState({
        isFetchingData: true,
        forecastData: undefined,
        error: {
            msg: undefined
        },
    });

    wrapper.instance().handleForecastError({});

    expect(wrapper.state().isFetchingData).toEqual(false);
    expect(wrapper.state().forecastData).toBeUndefined();
    expect(wrapper.state().error.msg.length).toBeGreaterThan(0);
});


test('should not render forecasts on error', () => {
    const wrapper = shallow(<CurrentForecast.Summary/>);
    wrapper.setProps({ error: { msg: 'test error' } });
    expect(wrapper.find('.weather-forecasts').length).toBe(0);
});

test('should render all forecast data', () => {
    const wrapper = shallow(<CurrentForecast.Summary />);
    wrapper.setProps({
        data: {
            name: 'test city',
            country: 'test country',
            list: dataForecast.data.list,
        },
    });
    expect(wrapper.find('.forecast-card').length).toBe(dataForecast.data.list.length);
});

/*
test('promises must be kept', async () => {
    expect.assertions(1);
    const resp = await getForecastFirstData('Kolkata');
    expect(resp.cityName).toEqual('Kolkata');
});*/
