const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  // création de nouveau users dans la base de données à partir de la connection de l'incription depuis l'application front end
  bcrypt
    .hash(req.body.password, 10) // va crypter le mot de passe
    .then((hash) => {
      const user = new User({
        email: req.body.email, //prend ce mot de passe crypter en créant un nouveau user avec ce mot de passe et l'adresse mail passer dans le corps de la requete
        password: hash,
      });
      user
        .save() // pour l'enregistrer dans notre base de données
        .then(() => res.status(201).json({ message: "utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
// permet au utilisateurs existant de se connecter à l'application donc on va commencer par trouver le user dans la base de données qui correspond à l'adresse email entrée par l'user de l'application
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // dans cette fonction login on récupére l'utilisateur de la base qui correspond à l'adresse mail entrée
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé!" });
      }
      bcrypt
        .compare(req.body.password, user.password) // on compare le mot de passe entrée avec le hash qui est gardé dans la base de données
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            // si c'est valable on lui renvoi un user id et un token
            userId: user._id,
            token: jwt.sign(
              { userId: user._id }, // on encode l'user id pour la création de nouveaux objets
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
