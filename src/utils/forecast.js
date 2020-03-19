const request = require('request');

const forecast = (latitude, longitude , callback) => {
    const url = 'https://api.darksky.net/forecast/892e768ab477cbc3833b72d8e08de072/'+ latitude +','+ longitude +'?units=si';

    request({url, json: true}, (error, {body}={}) => {
        if(error) {
            callback('Unable to connect to forecast services!', undefined); 
        } else if (body.error) {
            callback('Unable to find location!', undefined); 
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            });
        }
    });
}

module.exports = forecast;