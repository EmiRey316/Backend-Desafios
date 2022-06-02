const mongoose = require("mongoose");


const ChatSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    author: {
        name: {type: String, required: true},
        avatar: {type: String, required: true}
    },
    text: {type: String, required: true},
    date: {type: String, required: true}
});


const UsersSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String}
});



module.exports = {
    ChatSchema,
    UsersSchema
};