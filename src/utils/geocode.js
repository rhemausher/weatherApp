const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmhlbWF1c2hlciIsImEiOiJja2phbjF5YWIycHYwMnhwZHVzOGR5Nzk4In0.CDMBuMp-ts0_CCTEQqmRxA&limit=1'

    request({url, json:true}, (error, { body }) => {                
        if (error) {   
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {  
            callback('Unable to find location, try another search!', undefined)
        } else {
            callback(undefined, {
                // Using the Mapbox API, the coordinates of the feature’s center is in 
                // the form [longitude,latitude]
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                place_name:body.features[0].place_name
            })                 
        }
    })
}



module.exports = geocode