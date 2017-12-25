import React from 'react';
import CurrentLocWeather from './CurrentLocWeather';
import CurrentWeather from './CurrentWeather';

const MainPage = () => {
    return (
        <div>
            <CurrentLocWeather/>
            <CurrentWeather>
                <CurrentWeather.Summary />
            </CurrentWeather>
        </div>
    );
};

export default MainPage;
