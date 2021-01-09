const request = require('request')

const forecast = (lat, lon, callback) => {
    // Coordinates (Lat/Lon): Pass latitude and longitude coordinates to the API and auto-detect the 
    // associated location.
    const url ='http://api.weatherstack.com//current?access_key=710f70ca56b3fa14caeccb44115d4583&query=' + lat + ',' + lon + '&units=f'

    request({url, json:true}, (error, { body }) => {               
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback(body.error, undefined)
            } else {
                callback(undefined,
                    body.current.weather_descriptions[0] + ':  It is ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.  There is a ' + body.current.precip + '% chance of rain'
                )                 
            }
        })
}

module.exports = forecast