const jwt = require('jsonwebtoken');
// cd fichier rassemble les routes sensible de notre api
//on construit le middleware qui va vérifié le token reçu depuis le frontend et permettre uniquement  des requ^tes authentifié de réussir
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];//ça va nous renvoyer le tableau avec bearer et token et prendre le 2eme element du tableau
        const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET')//on décode le token avec vérify 
        const userId = decodedToken.userId;//on recupere la propriété du  token avec son user id 
        req.auth = {userId};//et on rajoute cette valeur à l'objet req qui est transmis au route
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