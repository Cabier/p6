const mongoose =require ('mongoose');

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type : String, required : true, unique:true},//unique true permet de dire qu'il est impossible de s'inscrire plusieurs fois avec la meêm adresse mail
    password: {type: String, required : true}
});

userSchema.plugin(uniqueValidator);// on l'applique au schema avant d'en faire un model

module.exports= mongoose.model('User',userSchema);