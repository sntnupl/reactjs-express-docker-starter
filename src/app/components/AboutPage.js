import React from 'react';

const AboutPage = () => {
    return (
        <div>
            <h3>Weatherbot: About</h3>
            <div>
                This bot allows you to fetch weather information. You have choice of getting Current Weather information,
                as well as Weather Forecast information for a particular city.
                <br/>
                If you allow this app to access your current locaton, it will also fetch the current weather information
                for this location.
            </div>
            <div className="social">
                Developer: Santanu Paul.
                Twitter: @sntnupl
            </div>
        </div>
    );
};

export default AboutPage;