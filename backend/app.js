//Importation dependance
const express = require ('express');
const sql = require('mysql2');
const cors = require('cors');

const app = express();

//parse le body
app.use(express.json());

// Autorise toute les requêtes CORS entre frontend et backend
app.use(cors());

// Connection à notre base de données
const connectionBDD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Groupomania'
  });