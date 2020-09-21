const request = require('request');

const options = {
    url: "http://api.weatherstack.com/current?access_key=eccb2ea726d10e08da0f541f7988d5b9&query=new%20york",
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
};


const apiResponse = request(options, (err, res, body) => {
    return JSON.parse(body);
});
module.exports = apiResponse;