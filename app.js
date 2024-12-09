const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(cookieParser())


app.get('/', (req,res)=>{
    res.cookie("name", "sabbir")
    res.send("done")
})

app.get('/salt', (req,res)=>{
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash("password", salt, function(err, hash){
            console.log(hash)
            // $2b$10$0jg6FFeG9mfPsThdcKE4geQiJvXaoz8K2AM6Z/EpVTRYhiH3yM8LO
        })
    })
})

app.get('/result', function(req, res){
    bcrypt.compare("password","$2b$10$0jg6FFeG9mfPsThdcKE4geQiJvXaoz8K2AM6Z/EpVTRYhiH3yM8LO", function(err, result){
        console.log(result)
    })
})

app.get('/read', (req,res)=>{
    console.log(req.cookies)
    res.send("read page")
})


var jwt = require('jsonwebtoken');


app.get('/jwt', (req, res)=>{
    let token = jwt.sign({ email: 'sabbir@gmail.com' }, 'secret') // made the token
    res.cookie("token", token) // saved it as a cookie
    console.log(token)
    res.send("done")
})

app.get('/readJWT', (req, res)=>{
    let data = jwt.verify(req.cookies.token, "secret")
    console.log(data)
    res.send(data)
})


app.listen(3000)