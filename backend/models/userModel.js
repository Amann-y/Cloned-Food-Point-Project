
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    password : {
        type: String,
        required : true,
        trim : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    cart :[{
    type : mongoose.Schema.Types.ObjectId,
    ref:""
    }]
    
},{timestamps : true})

const UserModel = mongoose.model('users', userSchema)

module.exports = {UserModel}