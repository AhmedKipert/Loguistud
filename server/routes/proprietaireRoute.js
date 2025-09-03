const express = require('express');
const proprietaireRouter = express.Router();
const proprietaireController = require('../controllers/proprietaireController');
const multer = require('../middlewares/multer')

// Inscription
proprietaireRouter.post('/inscription', multer.upload.single('photoProfile'), proprietaireController.create);

module.exports = proprietaireRouter;