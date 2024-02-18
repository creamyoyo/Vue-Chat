const express = require('express');
const { addMessage, getAllMessages } = require('../controllers/messageController.js');

const messageRouter = express.Router();
messageRouter.post('/addmsg', addMessage);
messageRouter.post('/getmsg', getAllMessages);

module.exports = messageRouter