const express = require('express');
const logementRoute = express.Router();
const logementController = require('../controllers/logementController');
const {uploadMany} = require('../middlewares/multer')

// Création d'une annonce de logement
logementRoute.post('/', uploadMany.array('photos'), logementController.createLogement);

// Liste des logements
logementRoute.get('/', logementController.getLogements);
logementRoute.get('/:id', logementController.getLogement);

module.exports = logementRoute;