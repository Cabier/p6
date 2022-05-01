let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let sauceSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  // systeme like dislike
  likes: { type: Number, default: 0 }, //par default pas de like
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

const Sauce = mongoose.model("Sauce", sauceSchema);

module.exports = Sauce;
