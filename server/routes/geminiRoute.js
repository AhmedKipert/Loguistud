const express = require('express');
const geminiController = require('../controllers/geminiController')
const geminiRoute = express.Router();

geminiRoute.post('/descriptionzone', geminiController.descriptionZone);

module.exports = geminiRoute;