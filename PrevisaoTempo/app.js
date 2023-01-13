const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?q=brasilia&units=metric&appid=4786c0cfb939ae9f792cc4d0af3f348d";

    https.get(url, (response)=>{
        response.on("data", (data)=>{
            const tempoDados = JSON.parse(data);
            const temperatura = tempoDados.main.temp;
            const descricao = tempoDados.weather[0].description;
            const icon = tempoDados.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            
            res.write("<h1>Temperatura de Brasilia:"+ temperatura + " graus Celcius.</h1>");
            res.write("<p>Description: " + descricao + "</p>");
            res.write("<img src="+imageUrl+">");
            res.send();

            console.log(tempoDados);
        });
    });
});

app.listen(3000, ()=>{
    console.log("http://localhost:3000/")
});