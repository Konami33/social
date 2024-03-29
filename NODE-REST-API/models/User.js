//to create a model we require  mongoose
const mongoose = require("mongoose");

//creating UserSchema
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email : {
        type: String,
        required: true,
        max: 20,
        unique: true
    },
    password : {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture : {
        type: String,
        default: ""
    },
    coverPicture : {
        type: String,
        default: ""
    },
    followers: {
        type : Array,
        default : []
    },
    following: {
        type: Array,
        default : []
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    desc : {
        type : String,
        max : 100
    },
    city : {
        type : String,
        max : 50
    },
    from : {
        type : String,
        max : 50
    },
    relationship : {
        type : Number,
        enum : [1,2,3]
    }

}, {timestamps : true} );
module.exports = mongoose.model("User", UserSchema);

//timestamps : when updating or create this schema it will automatically update