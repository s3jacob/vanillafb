'use strict';

const Readline =  require("readline");
const rl = Readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    terminal : false

});

const matcher = require('./matcher');
const weather = require('./weather');
const { currentWeather, forecastWeather } = require("./parser");
rl.setPrompt(">");
rl.prompt();



rl.on('line', reply=>{
    console.log(`You said :: ${reply}`);
    matcher(reply, data => {
        switch (data.intent){
            case "Hello":
                console.log(`${data.entities.greeting} to you too!`)
                rl.prompt();
                break;
            case "exit":
                console.log("Bye! Have a great day !")
                process.exit(0);
                break;
            case "CurrentWeather":
                console.log(`Checking weather for ${data.entities.city}`)
                weather(data.entities.city)
                    .then(response=>{
                        let parseResult = currentWeather(response);
                        console.log(parseResult);
                    rl.prompt();
                }).catch( error => {
                    console.log(error);
                    console.log("There seems to be a problem while connecting to weather service..");
                    rl.prompt();
                });
                rl.prompt();
                break;
            default:
                console.log("Sorry! I dont understand what you mean :(");
                rl.prompt();
        }
    })
}); //event listener