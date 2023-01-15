const https = require("https");
const express = require("express");
const bodyParser = require('body-parser')
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
});

app.post("/", (req, res) => {

    const city = req.body.cityName
    const appId = process.env.OpenWeatherMapAppId;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + appId;

    https.get(url, (response) => {
        if (response.statusCode == `404`) {
            res.send("<h1>Cidade não encontrada</h1>")
        }

        response.on("data", (data) => {
            const tempoDados = JSON.parse(data);
            const temperatura = tempoDados.main.temp;
            const descricao = tempoDados.weather[0].description;
            const icon = tempoDados.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>Temperatura de " + tempoDados.name + ":" + temperatura + " graus Celcius.</h1>");
            res.write("<p>Description: " + descricao + "</p>");
            res.write("<img src=" + imageUrl + ">");
            res.send();

            console.log(tempoDados);
        });
    });
});


app.listen(3000, () => {
    console.log("http://localhost:3000/")
});