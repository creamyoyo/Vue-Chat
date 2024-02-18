const express = require('express');
const { register, login, setAvatar, getAllUsers } = require('../controllers/userController.js');

const userRouter = express.Router()
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/avatar/:id', setAvatar)
userRouter.get('/allusers/:id', getAllUsers)


module.exports = userRouter;