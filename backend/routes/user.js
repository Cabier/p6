const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup',userCtrl.signup);// seront des root post parce ce que le frontend va envoyer des information mail mdp
router.post('/login',userCtrl.login);

module.exports = router;