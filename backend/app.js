const express = require("express");

const app = express();

const mongoose = require("mongoose");

const saucesRoutes = require("./routes/sauces");

const usersRoutes = require("./routes/user");

const userLikes = require("./controllers/like");

const userDislikes = require("./controllers/dislikes");

mongoose
  .connect(
    "mongodb+srv://papayvou:Franklin1@cluster0.3me1g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true}
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
app.use(express.json()); // cd middleware intercepte toutes les requetes qui ont un content type json qui contiennent du json et nous mettent à disposition ce contenu sur l'objet requete dans req.body

app.use((req, res, next) => {
  // 1er middleware qui sera executé par le server et il est général on va pas y spécifier de route (ex api/stuff)
  res.setHeader("Access-Control-Allow-Origin", "*"); // l'origine qui à le droit d'accéder à notre api c'est tous le monde donc l'étoile *)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //on donne l'autorisation d'utiliser certain entête
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //ainsi que certaines requêtes
  next();
});

/** la route /images renvoie les fichier brute (statique) du répertoire images*/
app.use("/images", express.static("images"));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", usersRoutes);
app.use("/api/like", userLikes);
app.use("/api/dislikes", userDislikes);

module.exports = app;
