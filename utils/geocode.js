const request = require('request');


const geocode = (address,callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFzaGphaW5oc3IiLCJhIjoiY2s3dHl5cHByMDN5djNsbTdhbjNwMjhrZSJ9.98jbO-QGtQuBe2SA7FHkGQ&limit=1';
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to mapping services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    });
}

module.exports = geocode;