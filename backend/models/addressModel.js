
const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required : true,
    },
    fullName: {
        type: String,
        required : true,
    },
    address : {
        type: String,
        required : true,
        trim : true
    },
    city : {
        type: String,
        required : true,
    },
    state:{
        type: String,
        required : true,
    },
    pinCode:{
        type: String,
        required : true,
    },
    phone:{
        type: String,
        required : true,
    }
   
    
},{timestamps : true})

const AddressModel = mongoose.model('address', addressSchema)

module.exports = {AddressModel}