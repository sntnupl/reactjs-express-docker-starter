import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AboutPage from '../../components/AboutPage';

test('should render AboutPage correctly', () => {
    const wrapper = shallow(<AboutPage/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});