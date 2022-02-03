const express = require('express');
require('dotenv').config({path:'./config/.env'})
require('./config/sql');
const app = express();

//Serveur
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})