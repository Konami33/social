//to create a model we require  mongoose
const mongoose = require("mongoose");

//creating PostSchema
const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array,
    }
}, {timestamps : true} );

//members array te amar jar jar shathe chat korse tar tar id gula thakbe

module.exports = mongoose.model("Conversation", ConversationSchema);

//timestamps : when updating or create this schema it will automatically update