//Importation dependance
const express = require ('express');
const sql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());

// Autorise toute les requêtes CORS
app.use(cors());