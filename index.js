const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

function displayWeather(lat, lon, res) {
  const units = "imperial";
  const apiKey = "3e255a7d1662ac9a1efc1b93512399e0";
  //my unique api key
 const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  

https.get(url, function(response) {
        console.log(response.statusCode);


  
        let data = "";
    
        response.on("data", function(chunk){
         data += chunk;
        });

  response.on("end", function(){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const clouds = weatherData.clouds.all;
            const wind = weatherData.wind.speed;
            const humidity = weatherData.main.humidity;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
           // displays the output of the results
res.write("<h1> The weather is " + weatherDescription + "</h1>");
res.write("<h2>The Temperature in " + lat + " Latitude and " + lon +  " Longitude is " + temp + " Degrees Fahrenheit</h2>");

res.write("<h2> The windspeed is " + wind + " miles per hour</h2>");
res.write("<h2> The humidity is " + humidity + " percent</h2>");
    res.write("<h2> The cloudiness is " + clouds + " percent</h2>");
res.write("<img src=" + imageURL +">");
res.end();
        });
    });
}

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});


app.post("/", function(req, res) {
const lat = req.body.latInput;
  const lon = req.body.lonInput;
displayWeather(lat, lon, res);
});


app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port", process.env.PORT || 3000);
});

