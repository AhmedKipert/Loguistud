const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController');
const { authentificationMiddleware } = require('../middlewares/authentificationMiddleware');


// connexion
userRoute.post('/connexion', userController.connexion);
userRoute.get('/verificationtoken', userController.verificationToken);
userRoute.get('/me', authentificationMiddleware, userController.me);
userRoute.post('/deconnexion', userController.deconnexion);


module.exports = userRoute;