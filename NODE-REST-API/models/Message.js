//to create a model we require  mongoose
const mongoose = require("mongoose");

//creating PostSchema
const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    },
}, {timestamps : true} );

//member will contain only the chat list of the Message

module.exports = mongoose.model("Message", MessageSchema);

//timestamps : when updating or create this schema it will automatically update