import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CurrentLocWeather from '../../components/CurrentLocWeather';


const dataCurrentLocationWeather = {
    data: {
        name: 'kolkata',
        main: {
            temp: 15,
            temp_min: 12,
            temp_max: 25,
        },
        weather: [{description: 'mist'}],
        sys: {country: 'IN'},
    },
};

test('should render correctly', () => {
    const wrapper = shallow(<CurrentLocWeather/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should handle unavailability of location service', () => {
    global.navigator.geolocation = undefined;

    const wrapper = shallow(<CurrentLocWeather/>);
    expect(wrapper.state().error.msg.length).toBeGreaterThan(0);
});

test('should not have error state when location service is available', () => {
    global.navigator.geolocation = {
        getCurrentPosition: jest.fn(),
    };
    const wrapper = shallow(<CurrentLocWeather/>);
    expect(wrapper.state().error.msg).toBeUndefined();
});

test('state should be updated correctly on receiving weather data', () => {
    global.navigator.geolocation = {
        getCurrentPosition: jest.fn(),
    };
    const wrapper = shallow(<CurrentLocWeather/>);
    wrapper.instance().handleLocationWeatherData(dataCurrentLocationWeather);

    expect(wrapper.state().weatherData.name).toEqual(dataCurrentLocationWeather.data.name);
    expect(wrapper.state().weatherData.curr).toEqual(dataCurrentLocationWeather.data.main.temp);
});

test('state should be updated correctly on error while fetching weather data', () => {
    global.navigator.geolocation = {
        getCurrentPosition: jest.fn(),
    };
    const wrapper = shallow(<CurrentLocWeather/>);

    wrapper.setState({
        loc: {
            lat: 20,
            long: 40,
        }
    });
    wrapper.instance().handleLocationWeatherError({});
    expect(wrapper.state().error.msg).toBeTruthy();
});
