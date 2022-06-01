const express = require("express");
const Router = express.Router();
const  Sauce = require("../models/sauce");

Router.likeuser = (req,res,next) => {
    console.log("je suis dans le controller like");

const {id}=req.params
  console.log(id)
  const { userId } = req.body;
  console.log(userId)

Sauce.find({_id:id  }, (err, sauces) => {
      
    // cas erreur server
    if (err) {
      res.status(404).json({ status: 404, message: "server error" });
      return;
    }})
//la req sera envoyé par body--->raw au format json avec ces 2 di sessous
//{"userId":"544944949",
//"like" : -1}

//recuperer id dans l'url de la requete
console.log("--->CONTENU req.body - ctrl like");
console.log(req.body);

console.log("---->CONTENU req.params -ctrl like");
console.log(req.params);

//mise au format de l'id pour pouvoir aller chercher l'objet correspondant
}


Router.post("/:id/like", (req, res) => {
    // donnée passée en parametre de requette
    const {id}=req.params
    console.log(id)
    const { userId } = req.body;
    console.log(userId)
    // recherche de produit
    Sauce.find({_id:id  }, (err, sauces) => {
        
      // cas erreur server
      if (err) {
        res.status(404).json({ status: 404, message: "server error" });
        return;
      }
      // on trouve pas le produit
      if (sauces.length === 0) {
        res.status(404).json({ status: 404, message: "empty list" });
        return;
      }
      // ca veut dire que le person deja cliqué sur like
      if (sauces[0].usersLiked.includes(userId)) {
       res.status(200).json({ status: 200, message: "like exist" });
        return; 
      }//////////////////////////reflechir a un algorythme
      // on charche le produit et on le modifie
      Sauce.findOneAndUpdate(
        { _id: id},
        // 2 champs à mettre à jour
        {
          likes: sauces[0].likes + 1,
          usersLiked: [...sauces[0].usersLiked, userId],
        },
        (err, sauceupdated) => {
          // cas erreur server
          if (err) {
            res.status(400).json({ status: 400, message: "server error" });
            return;
            // cas erreur update dans la bd
          } else if (!sauceupdated) {
            res
              .status(401)
              .json({ status: 400, message: "error de mise à jour " });
            return;
            // toute est bon
          } else {
            res.status(201).json({
              status: 201,
              message: "like added !",
            });
          }
        }
      );
      if (sauces[0].usersLiked.includes(userId)) {
        res.status(200).json({ status: 200, message: "dislike exist" });
        return;
      }
      // on charche le produit et on le modifie
      Sauce.findOneAndUpdate(
        { _id: id},
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
              .status(401)
              .json({ status: 401, message: "error de mise à jour " });
            return;
            // toute est bon
          
          }
        }
      );
    });
  });
  
  module.exports = Router;