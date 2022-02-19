const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");
//require('./config/sql');
const path = require('path');

//Importation routes
const usersRoutes = require("./routes/user_routes");
const postsRoutes = require("./routes/posts_routes");
const commentsRoutes = require("./routes/comments_routes");
const likeRoutes = require("./routes/likes_routes");

const app = express();

/*intercepte les requetes qui ont un content type au format json et nous met à dispostion ce contenu, elle nous donne une accés au corps
de la requête qui est req.body */
app.use(express.json());

//Autorise les requêtes entre frontend et backend
app.use(cors());

//Importation des models
const db = require("./models");

//Enregistrement des routes API
app.use("/api/auth", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments",commentsRoutes);

//Middleware qui répond aux requête envoyés vers le dossier images et s'en serve
app.use("/images", express.static(path.join(__dirname, "images")));

//Crée les tables issue de l'importation des models si elles n'existent pas
db.sequelize.sync().then((req) => {
  //Serveur
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
});
