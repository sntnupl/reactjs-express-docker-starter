import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
jest.mock('../../services/WeatherService');
import CurrentForecast, {getForecastFirstData} from '../../components/CurrentForecast';


test('should render CurrentForecast correctly', () => {
    const wrapper = shallow(<CurrentForecast/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});


test('promises must be kept', async () => {
    expect.assertions(1);
    const resp = await getForecastFirstData('Kolkata');
    expect(resp.cityName).toEqual('Kolkata');
});