import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CurrentWeather from '../../components/CurrentWeather';

test('should render correctly', () => {
    const wrapper = shallow(
        <CurrentWeather>
            <CurrentWeather.Summary/>
        </CurrentWeather>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
});


/* TODO List
*   1. unless form is submitted, the initial state has no weather data [D]
*   2. isFetchingData [D]
*   3. error.msg is displayed when available [D]
*   4. On Submit, weather data is fetched properly and state update is done properly
*   5. If Weather-Summary has no city name, it does not render summary [D]
*   6. If Weather-Summary has error, it does not render summary [D]
**/

test('no weather data is displayed on initial render', () => {
    const wrapper = shallow(
        <CurrentWeather>
            <CurrentWeather.Summary/>
        </CurrentWeather>
    );
    expect(wrapper.state().isFetchingData).toBe(false);
    expect(wrapper.state().weatherData.name).toBeFalsy();
    expect(wrapper.state().weatherData.curr).toBeFalsy();
});


test('submit button stays disabled until a weather data fetch is complete', () => {
    const wrapper = shallow(
        <CurrentWeather>
            <CurrentWeather.Summary/>
        </CurrentWeather>
    );
    expect(wrapper.find('button [disabled]').length).toBe(0);
    wrapper.setState({ isFetchingData: true });
    expect(wrapper.find('button [disabled]').length).toBe(1);
});


test('weather form shows error, if any', () => {
    const wrapper = shallow(
        <CurrentWeather>
            <CurrentWeather.Summary/>
        </CurrentWeather>
    );
    wrapper.setState({
        error: { msg: 'test error' }
    });
    const formNode = wrapper.find('form').children();
    expect(formNode.contains(<span>test error</span>));
});


test('no summary data is rendered if location name is unavailable', () => {
    const wrapper = shallow(<CurrentWeather.Summary />);
    wrapper.setProps({ data: { name: undefined } });
    expect(wrapper.find('.weather-data-card').length).toBe(0);
});


test('no summary data is rendered if there is error', () => {
    const wrapper = shallow(<CurrentWeather.Summary />);
    wrapper.setProps({ error: { msg: undefined } });
    expect(wrapper.find('.weather-data-card').length).toBe(0);
});


test('weather data is handled correctly', () => {
    const wrapper = shallow(
        <CurrentWeather>
            <CurrentWeather.Summary/>
        </CurrentWeather>
    );
    wrapper.setState({
        isFetchingData: true,
        weatherData: {}
    });
    wrapper.instance().handleWeatherData({
        data: {
            name: 'kolkata',
            main: {
                temp: 15,
                temp_min: 12,
                temp_max: 25,
            },
            weather: [{ description: 'test description' }],
        }
    });

    expect(wrapper.state().isFetchingData).toBe(false);
    expect(wrapper.state().weatherData.name).toEqual('kolkata');
    expect(wrapper.state().weatherData.curr).toEqual(15);
});

test('weather fetch error is handled correctly', () => {
    const wrapper = shallow(
        <CurrentWeather>
            <CurrentWeather.Summary/>
        </CurrentWeather>
    );
    wrapper.setState({
        isFetchingData: true,
        weatherData: {},
        error: {},
    });
    wrapper.instance().onWeatherFetchError({});

    expect(wrapper.state().isFetchingData).toBe(false);
    expect(wrapper.state().error.msg).toBeTruthy();
});

test('weather summary is displayed correctly', () => {
    const wrapper = shallow(<CurrentWeather.Summary/>);
    wrapper.setProps({
        data: {
            name: 'kolkata',
            desc: 'test desc',
            curr: 15,
            min: 12,
            max: 25,
        },
    });
    expect(wrapper.find('.weather-data-card').length).toEqual(1);
});
