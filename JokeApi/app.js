const express = require("express");
const https = require("https");

const app = express();



app.get("/", (req, res) => {
    const url = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw";
    
    https.get(url, (jokeResponse) => {
        console.log(jokeResponse.statusCode);

        jokeResponse.on("data", (data) => {
            const jokeData = JSON.parse(data);

            if(jokeData.joke != undefined)
            {
                res.send(jokeData.joke)
            }
            else{
                res.write(jokeData.setup)
                res.write(jokeData.delivery)
                res.send();
            }
            
            console.log(data);
            console.log(jokeData);
        })
    })
});

app.get("/ConvertObjectToJson", (req, res)=>{
    const testObject ={
        teste: "transformando objeto em JSON",
        nome: "jdibai",
        stack:{
            back: "C#, NodeJS, Java",
            front: "JS, CSS, HTML"
        },
        ComidasFavoritas:[
            "Chocolate",
            "Pavê",
            "Escondidinho"
        ]
    }
    const jsonObject = JSON.stringify(testObject);  
    res.send(jsonObject.toString());

    console.log(testObject.ComidasFavoritas[0])
});

app.listen(3000, () => {
    console.log("http://localhost:3000/")
});
