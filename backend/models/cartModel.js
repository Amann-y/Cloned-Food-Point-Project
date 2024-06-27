
const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "fooditems",
        required : true,
    },
    imgURL:{
        type :"String",
        required: true
    },
    name:{
        type :"String",
        required: true
    },
    description:{
            type :"String",
            required: true
    },
    price : {
            type :"Number",
            required: true
    },
    qty:{
        type :"Number",
        required: true
    },
    createdAt: { type: Date, default: Date.now }
})

const cartSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
    },
    cartItem : [ cartItemSchema],
    
    
},{timestamps : true})

const CartItemsModel = mongoose.model('cartitems', cartSchema)

module.exports = {CartItemsModel}