const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const e = require("express");
require("dotenv").config();

const app = express();

app.use(express.static(`${__dirname}/public`))

app.use(bodyParser.urlencoded({
     extended: true
}))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
});

app.post("/", (req, res) =>{
    const nome = req.body.fName;
    const sobreNome = req.body.lName;
    const email = req.body.email;

    const url = "https://us21.api.mailchimp.com/3.0/lists/"+process.env.ChimpMailListId;
    const options = {
        method: "POST",
        auth: "jdibai:"+process.env.ChimpMailApiKey
    }
    const data = {
        members:[
            {
                email_address: email,
                email_type: "text",
                status: "subscribed",
                merge_fields: {
                    FNAME: nome,
                    LNAME: sobreNome
                },
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const request = https.request(url, options, (response)=>{
        
        if(response.statusCode === 200){
            res.sendFile(`${__dirname}/success.html`);
        }
        else{
            res.sendFile(`${__dirname}/failure.html`);
        }

        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res) =>{
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("http://localhost:3000/")
    console.log("Mailchimp doc: https://mailchimp.com/developer/marketing/api/")
    console.log("emails cadastrados: https://us21.admin.mailchimp.com/lists/members/#p:1-s:25-sa:last_update_time-so:false")
});
