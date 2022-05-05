//controllers stock la logique métier
const Sauce = require('../models/Sauce');

exports.createSauce=(req,res) => {
      console.log("req.body",req.body)
      console.log(`${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
  const sauce = new Sauce({
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      
  }) 
  sauce.save().then(()=>{
      res.status(201).json({message : "sauce créé"});
      
  })
  .catch((error) => {
      console.log(error)
      res.status(400).json({message : "erreur de création de sauce"});
  })
}

exports.modifySauce = (req, res, next) => {
  let imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  Sauce.updateOne({_id: req.params.id}, {...req.body, imageUrl: imageUrl}) // permet de mettre à jour ou de modifier un thing dans notre base de données 
  .then(() => {
     res.status(200).json({message:'Objet modifié!'});
  }).catch((error) => {
     res.status(400).json({error})
  })
}

exports.deleteSauce = (req, res) => {
  Sauce.findOne({_id:req.params.id}).then(
    (sauce) => {
    if (!sauce) {
      return res.status(404).json({
       error:new Error('Objet non trouvé!') 
      });
    }
    if (sauce.userId !== req.auth.userId) {
      return res.status(401).json({
        error: new Error('Requête non autorisée!')
      });
    }
    Sauce.deleteOne({_id:req.params.id})
    .then((Sauce) => res.status(200).json({message:'Objet suprimé!'}))
    .catch((error) => res.status(400).json({error}))
  }).catch((error) => res.status(400).json({error}))
}

exports.getAllSauce = (req, res) => {
  Sauce.find().then((sauces) => {
    // console.log("On demande toute les SAUCE !!!!!!!!! => ")
    // console.log("\n\n Next \n\n")
    // for (const sauce of sauces) {
    //   console.log("Sauce id:", sauce.id)
    //   console.log("Sauce name:", sauce.name)
    //   console.log("Sauce imageUrl:", sauce.imageUrl)
    //   console.log("\n\n Next \n\n")
    // }
    // console.log("Mes sauces", sauces);
    res.status(200).json(sauces);
  }).catch((error) => {
    res.status(400).json({error});
  });
}
exports.getoneSauce = (req, res,next) => {
  //ici on aura notre premier segment dynamique, le front end l'identifiant va envoyer l'id de l'objet et pour aller chercher cette identifian on va mettre :id ( les : disent que cette partie de la route est dynamique)
  // jaurais accès à la ligne 42 avec req.params.id
  Sauce.findOne({_id:req.params.id})
  .then(sauce => res.status(200).json(sauce))// c'est la ou on retrouvera notre thing si il existe dans notre base de données
  .catch(error => res.status(404).json({error}))
 };