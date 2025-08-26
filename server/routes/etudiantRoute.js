const express = require('express');
const etudiantController = require('../controllers/etudiantController');
const etudiantRoute = express.Router();
const multer = require('../middlewares/multer');


etudiantRoute.post('/inscription', multer.upload.single('photoProfil'), etudiantController.create);
// etudiantRoute.get('/verification', etudiantController.verificationEmail);



module.exports = etudiantRoute;