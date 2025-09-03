const express = require('express');
const messageRoute = express.Router();
const conversationController = require('../controllers/conversationController');
const { authentificationMiddleware } = require('../middlewares/authentificationMiddleware');

messageRoute.post('/', authentificationMiddleware, conversationController.message);
messageRoute.get('/', authentificationMiddleware, conversationController.messages);
messageRoute.get('/:id', authentificationMiddleware, conversationController.mesConversations);
module.exports = messageRoute;