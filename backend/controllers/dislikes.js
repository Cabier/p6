const express = require("express"),
  Router = express.Router(),
  Sauce = require("../models/Sauce");

Router.post("/addDislike", (req, res) => {
  // donnée passée en parametre de requette
  const { userId, idProduct } = req.body;
  // recherche de produit
  Sauce.find({ _id: idProduct }, (err, sauces) => {
    // cas erreur server
    if (err) {
      res.status(400).json({ status: 400, message: "server error" });
      return;
    }
    // on trouve pas le produit
    if (sauces.length === 0) {
      res.status(400).json({ status: 400, message: "empty list" });
      return;
    }
    // ca veut dire que le person deja cliqué sur like
    if (sauces[0].usersLiked.includes(userId)) {
      res.status(200).json({ status: 200, message: "dislike exist" });
      return;
    }
    // on charche le produit et on le modifie
    Sauce.findOneAndUpdate(
      { _id: idProduct },
      // 2 champs à mettre à jour
      {
        dislikes: sauces[0].dislikes + 1,
        usersDisliked: [...sauces[0].usersDisliked, userId],
      },
      (err, sauceupdated) => {
        // cas erreur server
        if (err) {
          res.status(400).json({ status: 400, message: "server error" });
          return;
          // cas erreur update dans la bd
        } else if (!sauceupdated) {
          res
            .status(400)
            .json({ status: 400, message: "error de mise à jour " });
          return;
          // toute est bon
        } else {
          res.status(201).json({
            status: 201,
            message: "like delete !",
          });
        }
      }
    );
  });
});

module.exports = Router;
