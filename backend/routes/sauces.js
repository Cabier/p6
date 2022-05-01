const express = require('express');
const router = express.Router();
const  like = require('../controllers/like')

const sauceCtrl = require('../controllers/sauce')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.get('/', auth,multer, sauceCtrl.getAllSauce);

router.post('/',auth, multer, sauceCtrl.createSauce); 

router.delete('/:id',auth,multer,sauceCtrl.deleteSauce);


     
router.get('/:id',auth,multer,sauceCtrl.getoneSauce);
  
router.put('/:id',auth, multer, sauceCtrl.modifySauce);  

 
module.exports = router;
   
   