const userModel = require('../model/userModel.js');

exports.register = async (req, res, next) => {
    try{
        const { username, email, password } = req.body;
        const usernameCheck = await userModel.findOne({ username });
        if (usernameCheck) {
            return res.status(409).send({ msg: 'Username already used' });
        }
        const emailCheck = await userModel.findOne({ email });
        if (emailCheck) {
            return res.status(409).send({ msg: 'Email already used' });
        }
        const user = await userModel.create({
            username,
            email,
            password
        });
        delete user.password
        res.status(200).send(user)
    }catch(err){
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username, password });
        if (!user) {
            return res.status(404).send({ msg: 'Invalid username or password' });
        }
        delete user.password;
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
};

exports.setAvatar = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id, {
            isAvatarImageSet: true,
            avatarImage: req.body.image
        }, { new: true })
        delete user.password;
        res.status(200).send(user);
    }catch(err){
        next(err)
    }
}

exports.getAllUsers = async (req, res, next) => {
    try{
        const currentUserId = req.params.id
        const users = await userModel.find({ _id: { $ne: currentUserId } }).select([
            "emain",
            "username",
            "avatarImage",
            "_id"
        ])
        res.status(200).send(users);
    }catch(err){
        next(err)
    }
}