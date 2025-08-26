const express = require('express');
const conversationController = require('../controllers/conversationController');
const { authentificationMiddleware } = require('../middlewares/authentificationMiddleware');
const conversationRoute = express.Router();

conversationRoute.post('/conversation/:id', authentificationMiddleware, conversationController.conversation);
conversationRoute.get('/conversations', authentificationMiddleware, conversationController.conversations);


module.exports = conversationRoute;