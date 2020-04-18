const express = require("express"); /*import v require, why doesn't it work here?*/
const http = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/");
   
});

app.post("/", function(req, res) {

    const query = req.body.cityName;
    const apiKey = `f032840519e6f1fb4224c46f55677ca9`;  /**Why do these values need to have back ticks?*/
    const unit = `metric`;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

http.get(url, function(response){
    // console.log(response.statusCode);

    response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const realFeel = weatherData.main.feels_like;
        const icon = weatherData.weather[0].icon;
        const sky = weatherData.weather[0].description;
        const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    
        res.write(`<h1>The weather in ${query} is ${temp} degrees celsius.</h1>`);
        res.write(`<p>Real feel - ${realFeel} degrees.<br><br> Description - ${sky}.</p>`);
        res.write(`<img src= ${iconURL}>`);
    })
})


    console.log("Post received.");
});



/*figure out why this step is necessary*/
app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})
    
