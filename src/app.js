const path = require('path');
const express = require('express');
const hsb = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hsb.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/' ,(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yash Jain'
    });
});

app.get('/about' ,(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yash Jain'
    });
});

app.get('/help' ,(req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yash Jain',
        msg: 'Some Help Message!!'
    });
});


app.get('/weather' ,(req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide the address!'
        });
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return res.send({
                error: 'Error, ' + error
            });
        }
        forecast(latitude, longitude, (error, {summary, temperature, precipProbability} = {}) => {
            if(error) {
                return res.send({
                    error: 'Error, ' + error
                });
            }
            res.send({
                location,
                forecast: summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain.'
            });
        });
    });
});



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article Not Found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page Not Found'
    });
});

// Starting the Server
app.listen(port, () => {
    console.log('Server is up on '+ port +'.');
});