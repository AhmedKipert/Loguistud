const express = require('express');
const etudiantController = require('../controllers/etudiantController');
const etudiantRoute = express.Router();
const multer = require('../middlewares/multer');


etudiantRoute.post('/inscription', multer.upload.single('photoProfile'), etudiantController.create);
etudiantRoute.put('/editer-informations-personnelles', multer.upload.single('photoProfile'), etudiantController.editerMesInformations);
etudiantRoute.put('/modifier-email', etudiantController.modifierEmail);
etudiantRoute.put('/modifier-motdepasse', etudiantController.modifierMotDePasse);
// etudiantRoute.post('/modifier/informationsacademiques', etudiantController.updateInformationsAcademiques);
// etudiantRoute.get('/verification', etudiantController.verificationEmail);



module.exports = etudiantRoute;