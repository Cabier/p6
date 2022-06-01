//if (!objet.userLiked.includes(req.body.userId)&& req.body.like === 1){//si id del' user like et aussi like = 1
   // console.log("----->userId n'est pas dans userliked la base de données et requete front like")  
    //}})
    Sauce.updateOne(
    {_id : req.params.id},
    {
      $inc: {like: 1},
      $push:{userLiked: req.body.userId}
    }
    )

    const {id}=req.params
  const { userId } = req.body;
  console.log("---->CONTENU req.params -ctrl like");
  console.log(req.params);//identifiant de la sauce, la sauce liké
  console.log("contenu de l'id-------",id)//6291ecb66c449cc22a2515bb
  console.log("--->CONTENU user>ID");
  console.log(userId)
  console.log("--->CONTENU req.body - ctrl like");//{ userId: '628ba5b2bb195a8983d99e74', like: 0 }
  console.log(req.body)