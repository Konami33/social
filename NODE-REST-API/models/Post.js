//to create a model we require  mongoose
const mongoose = require("mongoose");

//creating PostSchema
const PostSchema = new mongoose.Schema({
    userId: {
        type : String,
        required : true
    },
    desc : {
        type : String,
        max : 500 
    },
    img : {
        type : String
    },
    likes : {
        type : Array,
        default : []
    }
}, {timestamps : true} );
module.exports = mongoose.model("Post", PostSchema);

//timestamps : when updating or create this schema it will automatically update