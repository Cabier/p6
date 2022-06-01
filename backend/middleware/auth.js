const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];//ça va nous renvoyer le tableau avec bearer et token et prendre le 2eme element du tableau
        const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET')//débloquer le token
        const userId = decodedToken.userId;//on recupere le user id 
        req.auth = {userId};
        if(req.body.userId && req.body.userId !== userId){//si on a un user id dans le corps de la requete qui est différent de l'user id
         throw 'User ID non valable !';  
        } else {
            next()// middleware appliquer avant les controllers
        }
    } catch(error) {
        console.log("error",error)
        res.status(401).json({error: 'requête non authentifiée'});
    }
}