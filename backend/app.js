const express = require("express"); 

const app = express();

const mongoose = require("mongoose");

const saucesRoutes = require("./routes/sauces");

const usersRoutes = require("./routes/user");

const userLikes = require("./controllers/like");

require("dotenv").config();

const rateLimit = require("express-rate-limit");

app.use(express.json()); // cd middleware intercepte toutes les requetes qui ont un content type json qui contiennent du json et nous mettent à disposition ce contenu sur l'objet requete dans req.body


mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.3me1g.mongodb.net/" +
      process.env.DB_NAME +
      "?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// (empèche les requette au image statique (mais seulement depuis le front)) REGLE DES FAILLES DE SECURITE DANS LES ENTETE HTTP
// app.use(helmet());
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
// RATE LIMIT PERMET DE LIMITER LE NOMBRE DE REQUETE QUI PEUVENT ETRE FAITE SUR LAPI SUR UNE PERIODE DONNER PAR EX ON LIMITE 100 REQUETES PAR 15 MINUTES
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
/** la route /images renvoie les fichier brute (statique) du répertoire images*/
app.use('/images', express.static('images'));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', usersRoutes);
app.use('/api/sauces', userLikes);
//app.use("/api/sauces", userDislikes);

module.exports = app;

//IDDE DIMPLEMENTATION DE SECU : PASSWORD VALIDATOR / CRYPTO JS /
