const express = require("express");
const Router = express.Router();
const Sauce = require("../models/sauce");

Router.post("/:id/like",  async (req, res, next) => {
  const { userId, like } = req.body;
  const { id } = req.params;

  switch (like) {
    case 1:
      return Sauce.updateOne(
        { _id: id },
        { $push: { usersLiked: userId }, $inc: { likes: 1 } }
      )
        .then(() => res.status(200).json({ message: "Updated" }))
        .catch((e) => res.status(400).json({ error: "Error" }));
    case 0:
      const sauce = await Sauce.findOne({ _id: id });

      if (sauce.usersLiked.includes(userId)) {
        return Sauce.updateOne(
          { _id: id },
          { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
        )
          .then(() => res.status(200).json({ message: "Updated" }))
          .catch((e) => res.status(400).json({ error: "Error" }));
      } else if (sauce.usersDisliked.includes(userId)) {
        return Sauce.updateOne(
          { _id: id },
          { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
        )
          .then(() => res.status(200).json({ message: "Updated" }))
          .catch((e) => res.status(400).json({ error: "Error" }));
      } else {
        return res
          .status(400)
          .json({ error: "The user did not give a feedback yet" });
      }

    case -1:
      return Sauce.updateOne(
        { _id: id },
        { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } }
      )
        .then(() => res.status(200).json({ message: "Updated" }))
        .catch((e) => res.status(400).json({ error: "Error" }));
    default:
      return res.status(400).json({message: "Erreur inconnue"})
  }
});

module.exports = Router;
//if req.body.like =1
//dans cette condition verifier si le user a disliker ou liker   else if req .body.like or dislike
//else meme chose pour les dislike
