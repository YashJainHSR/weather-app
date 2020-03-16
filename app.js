const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];
if(!address) {
    return console.log('Please provide an address!');
}

geocode(address, (error, {location, latitude, longitude}) => {
    if(error) {
        return console.log(error);
    }
    console.log(location);
    forecast(latitude, longitude, (error, {summary, temperature, precipProbability}) => {
        if(error) {
            return console.log(error);
        }
        console.log(summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain');
    });
});
