const express = require('express');
const logementRoute = express.Router();
const logementController = require('../controllers/logementController');
const {uploadMany} = require('../middlewares/multer');
const { authentificationMiddleware } = require('../middlewares/authentificationMiddleware');

// Création d'une annonce de logement
logementRoute.post('/', uploadMany.array('photos'), logementController.createLogement);

// Liste des logements
logementRoute.get('/', logementController.getLogements);
logementRoute.get('/annonces/:id', logementController.getLogement);
logementRoute.get('/mesannonces', authentificationMiddleware, logementController.getMesAnnonces)
logementRoute.delete('/annonces/:id/supprimer', logementController.deleteAnnonce);

module.exports = logementRoute;