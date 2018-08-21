const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const routers = require("./routes.js");


const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://saqib:saqib123@ds119422.mlab.com:19422/mongoapp')
mongoose.connection.once('open',()=>{
  console.log('connection starting')
}).on('error', (error)=>{
  console.warn('connection error', error)
})

app.use(bodyParser())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())




app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'public')))
app.use('/static',express.static(path.join(__dirname,'./public/static')))

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/api/todo',routers);


app.listen(PORT,()=>{
    console.log('server running');
})