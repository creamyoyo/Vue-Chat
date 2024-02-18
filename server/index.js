const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoute.js');
const messageRouter = require('./routes/messageRoute.js');
const socket = require('socket.io')
const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRouter)
app.use('/api/message', messageRouter)

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((error) => console.log(error))


const server = app.listen(process.env.PORT, ()=>{
    console.log(`server running on ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:5175',
        credentials: true
    }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    
    socket.on('add-user', (userId) => {
        console.log(userId)
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
        console.log(data)
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
        }
    });
});