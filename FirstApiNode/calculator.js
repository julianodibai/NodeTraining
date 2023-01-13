const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/calculator.html`)
});

app.post('/', (req, res) =>{
    var num1 =  Number(req.body.num1) 
    var num2 = Number(req.body.num2)

    var result = num1 + num2

    res.send(`O resultado da soma de ${num1} + ${num2} = ${result}`)
})

app.get("/bmiCalculator", (req, res) =>{
    res.sendFile(`${__dirname}/bmiCalculator.html`)
})

app.post("/bmiCalculator", (req, res) =>{
    console.log(req.body)
    var peso = parseFloat(req.body.peso)
    var altura = parseFloat(req.body.altura)
    var result = peso / (altura * altura)

    res.send(`Seu IMC é de ${result}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`http://localhost:${port}/`)
    console.log(`http://localhost:${port}/bmiCalculator`)
    console.log(__dirname)
  })