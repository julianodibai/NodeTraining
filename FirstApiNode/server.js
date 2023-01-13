//jhint esversion:6

const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
    response.send('<h2>Hello World!</h2>')
});

app.get("/contato", function(req, res){
    res.send("Contato: julianodibai2008@gmail.com")
});

app.get("/contato/github", (req, res)=>{
    res.send("https://github.com/julianodibai")
});

app.get("/sobre", function(req, res){
    res.send("Api teste")
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}/`)
  console.log(`http://localhost:${port}/contato/`)
  console.log(`http://localhost:${port}/sobre/`)
})