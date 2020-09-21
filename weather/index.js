"use strict";

const axios = require('axios');
const key = 'eccb2ea726d10e08da0f541f7988d5b9';

const formatData = data =>{
    return {
        location : `${data.location.name}, ${data.location.country}`,
        temperature: data.current.temperature,
        code:data.current.weather_code,
        condition: data.current.weather_descriptions[0],
        // forecast: data.forecast.forcastday.map(day => {
        //     return {
        //         date: day.date,
        //         code: day.day.condition.code,
        //         condition: day.day.condition.text
        //     }
        // })
    }
}

const getWeather = async location =>{
    return await axios.get(`http://api.weatherstack.com/forecast`,{
        params :{
            access_key : key,
            query : location,
        }
    })
        .then(resp => {
        return formatData(resp.data);
    }).catch(error=>{
        console.log(error);
        return error;
        });
};
module.exports = getWeather;