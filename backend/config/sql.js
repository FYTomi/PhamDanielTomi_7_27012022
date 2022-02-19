require('dotenv').config({path:'.env'})
//Connection à la BDD MySQL
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: `${process.env.MDPBDD}`,
  database: 'groupomania'
});

//Connect to MySQL

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    db.query("CREATE DATABASE groupomania", function (err, result) {
      if (err) throw err;
      console.log("Base de données ajouté");
    });
  });