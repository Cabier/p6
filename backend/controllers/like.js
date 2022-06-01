const express = require("express");
const Router = express.Router();
const Sauce = require("../models/sauce");

Router.post("/:id/like", (req, res) => {
  // donnée passée en parametre de requette
  const { id } = req.params;
  const { userId, like } = req.body;
  // recherche de produit
  Sauce.find({ _id: id }, (err, sauces) => {
    // cas erreur server
    if (err) {
      res.status(400).json({ status: 400, message: "server error" });
      return;
    }
    // on trouve pas le produit
    if (sauces.length === 0) {
      res.status(401).json({ status: 400, message: "empty list" });
      return;
    }

    if (like === 0) {
      // suppression de like
      if (sauces[0].usersLiked.includes(userId)) {
        Sauce.findOneAndUpdate(
          { _id: id },
          // 2 champs à mettre à jour
          {
            likes: sauces[0].likes - 1,
            usersLiked: sauces[0].usersLiked.filter((id) => id != userId),
          },
          (err, sauceupdated) => {
            // cas erreur server
            if (err) {
              res.status(400).json({ status: 400, message: "server error" });

              // cas erreur update dans la bd
            } else if (!sauceupdated) {
              res
                .status(400)
                .json({ status: 400, message: "error de mise à jour " });
              return;
              // toute est bon
            }
          }
        );
        res.status(200).json({ status: 200, message: "like deleted" });
        return;
      }
      // suppression de dislike
      if (sauces[0].usersDisliked.includes(userId)) {
        Sauce.findOneAndUpdate(
          { _id: id },
          // 2 champs à mettre à jour
          {
            dislikes: sauces[0].dislikes - 1,
            usersDisliked: sauces[0].usersDisliked.filter((id) => id != userId),
          },
          (err, sauceupdated) => {
            // cas erreur server
            if (err) {
              res.status(400).json({ status: 400, message: "server error" });

              // cas erreur update dans la bd
            } else if (!sauceupdated) {
              res
                .status(400)
                .json({ status: 400, message: "error de mise à jour " });
              return;
              // toute est bon
            }
          }
        );
        res.status(200).json({ status: 200, message: "dislike deleted" });
        return;
      }
    }
    // cas de click sur like

    if (like === 1) {
      // suppression de like
      Sauce.findOneAndUpdate(
        { _id: id },
        // 2 champs à mettre à jour
        {
          likes: sauces[0].likes + 1,
          usersLiked: [...sauces[0].usersLiked, userId],
        },
        (err, sauceupdated) => {
          // cas erreur server
          if (err) {
            res.status(400).json({ status: 400, message: "server error" });

            // cas erreur update dans la bd
          } else if (!sauceupdated) {
            res
              .status(400)
              .json({ status: 400, message: "error de mise à jour " });
            return;
            // toute est bon
          }
        }
      );
      res.status(200).json({ status: 200, message: "like added" });
      return;
    }
    //  cas de cclick sur dislike
    if (like === -1) {
      Sauce.findOneAndUpdate(
        { _id: id },
        // 2 champs à mettre à jour
        {
          dislikes: sauces[0].dislikes + 1,
          usersDisliked: [...sauces[0].usersDisliked, userId],
        },
        (err, sauceupdated) => {
          // cas erreur server
          if (err) {
            res.status(400).json({ status: 400, message: "server error" });

            // cas erreur update dans la bd
          } else if (!sauceupdated) {
            res
              .status(400)
              .json({ status: 400, message: "error de mise à jour " });
            return;
            // toute est bon
          }
        }
      );
      res.status(200).json({ status: 200, message: "dislike deleted" });
      return;
    }
  });
});

module.exports = Router;
//if req.body.like =1
//dans cette condition verifier si le user a disliker ou liker   else if req .body.like or dislike
//else meme chose pour les dislike
