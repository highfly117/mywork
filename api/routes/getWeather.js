const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const queryString = require('query-string');
const  moment = require("moment");

router.post('/', (req, res) => {

    
// set the Timelines GET endpoint as the target URL
const getTimelineURL = "http://api.weatherapi.com/v1";

const apiType = "forecast"

// get your key from app.tomorrow.io/development/keys
const apikey = "b54a1766725342b380492049231805";

// pick the location, as a latlong pair
let location = "CR0 7SJ";

let days = "1"

let URL = getTimelineURL + "/" + apiType + ".json?" + "key=" + apikey + "&q=" + location + "&days=" + days + "&aqi=no&alerts=no"

//console.log(URL)


    fetch(URL, {method: "GET", compress: true})
    .then((result) => result.json())
    .then((json) => {
        
       console.log(json)
       
        return res.send(json)
    })
    .catch((error) => console.error("error: " + error))


    



});






module.exports = router;