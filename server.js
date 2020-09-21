'use strict';
const debug = require('debug')('vanillafb')
const express = require("express");
const matcher = require("./matcher");
const weather = require("./weather");
const {currentWeather} = require("./parser");
const server = express();
const PORT = process.env.PORT || 3000;
const config = require("./config");
const FBeamer = require("./fbeamer");
const bodyParser = require("body-parser");
const f = new FBeamer(config.fb);


server.get('/', (req, res) => f.registerHook(req, res));
server.post(
    "/",
    bodyParser.json({
        verify: f.verifySignature.call(f)
    })
);
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
server.post("/", (req, res, next) => {
    // Messages will be received here if the signature goes through
    // we will pass the messages to FBeamer for parsing

    console.log("Recieved response");
    return f.incoming(req, res, data => {
        try {
            if (data.type === "text") {
                matcher(data.content, async resp => {
                    switch (resp.intent) {
                        case "Hello":
                            await f.txt(data.sender, `${resp.entities.greeting} to you too!`);
                            break;
                        case "CurrentWeather":
                            await f.txt(data.sender, "Let me check...");
                            let cwData = await weather(resp.entities.city);
                            let cwResult = currentWeather(cwData);
                            await f.txt(data.sender, cwResult);
                            break;
                        case "WeatherForecast":
                            await f.txt(data.sender, "Let me check...");
                            let wfData = await weather(resp.entities.city);
                            let wfResult = forecastWeather(wfData, resp.entities);
                            await f.txt(data.sender, wfResult);
                            break;
                        default: {
                            await f.txt(data.sender, "I don't know what you mean :(");
                        }
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    });
    next();
});

server.listen(PORT,()=>`FBeamer Bot service running on PORT ${PORT}`);