const messageModel = require('../model/messageModel.js');

exports.addMessage = async (req, res, next) =>{
    try {
        const {from, to, message} = req.body
        const data = await messageModel.create({
            message: { text: message},
            users: [from, to],
            sender: from
        })
        if(data) return res.json({msg: "Message added successfullu."})
        return res.json({msg: "Failed to add message to the database"})

    }catch(err){
        next(err)
    }
} 

exports.getAllMessages = async (req, res, next) => {
    try{
        const {from, to} = req.body
        const messages = await messageModel.find({
            users: {
                $all: [from, to]
            }
        }).sort({updatedAt: 1}) 
        const projectMessage = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.json(projectMessage)
    }catch(err){
        next(err)
    }
}; 