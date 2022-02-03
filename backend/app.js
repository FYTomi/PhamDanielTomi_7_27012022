const express = require('express');
require('dotenv').config({path:'./config/.env'})
const app = express();


//Importation des models
const db = require('./models')

db.sequelize.sync().then((req) => {
    //Serveur
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
    });
});


