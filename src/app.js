const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// process.env.PORT provides listen port our application should use when running
// on Heroku.  If not running on Heroku, then use port 3000
const listenPort = process.env.PORT || 3000

// Define aths for Express config
const RootDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')   // set up handle bars (headers/footers)
app.set('views', viewsPath)     // change path for the views directory
hbs.registerPartials(partialsPath)

// Set up static directory to serve
// this apparently sets up the ROOT directory from which index.html will
// be retrieved.  It will replace the route to the Root page if it finds 
// index.html in the folder
//  http://localhost:3000
app.use(express.static(RootDir))       // customize your folder

//  Route 1:  Root (index.hbs)
// http://localhost:3000
app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name:'Mark A Jones'
    })
})

//  Route 2:  About (about.hbs)
// http://localhost:3000/about
app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About Page',
        name:'Mark A Jones'
    })
})

//  Route 3:  help (help.hbs)
// http://localhost:3000/help
app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help Page',
        name:'Mark A Jones'
    })
})

// Route 4: Weather page
// set up a handler for the weather page
//  http://localhost:3000/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
             error:  'You must provide a valid address'
         })
     }

     // our server would crash if the place being looked up is not found.
     // To prevent this, set up default values for latitude, longitude and 
     // place_name
    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
        
            console.log('location:  ' + place_name)
            console.log(forecastData)

            res.send({  // send back some JSON data
                location: place_name,
                forecast: forecastData,
                address: req.query.address
            })
        })
        
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send ({
            error:  'You must provide a search term'
        })
    }
   
    console.log(req.query.search)
    res.send({  // send back some JSON data
        products: []
    })
    
})

//  Route 5:  help (anything not defined above.hbs)
// http://localhost:3000/help/whatever
app.get('/help/*', (req, res)=> {
    console.log('/help/*******')
    res.render('404', {
        title: '404',
        name:'Mark A Jones',
        msg:'Help article not found'
    })
})

//  Route 6:  help (anything not defined above.hbs)
// This catch all must appear jst before app.listen()
// http://localhost:3000/whatever
app.get('*', (req, res)=> {
    console.log('*******')
    res.render('404', {
        title: '404',
        name:'Mark A Jones',
        msg:'Page not found'
    })
})

app.listen(listenPort, () => {
    console.log('Server is up on port: ' + listenPort)
})