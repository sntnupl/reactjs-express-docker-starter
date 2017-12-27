/* ::<-  Fixtures  ->:: */
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

export const weatherLocation = (lat, long) => {
    console.log('>>> returning mocked promise..');
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            long === -1 ? reject({msg: 'invalid location'}) : resolve(dataCurrentLocationWeather);
        });
    });
};

export const ForecastCity = (city = '__empty__') => {
    console.log('>>> returning mocked promise..');
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            (city !== '__empty__') ? resolve(dataForecast) : reject({msg: 'invalid location'});
        });
    });
};
