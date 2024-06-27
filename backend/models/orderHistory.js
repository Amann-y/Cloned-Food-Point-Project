
const mongoose = require("mongoose")

const orderHistorySchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
    },
    items : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "fooditems",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now, // Set default value to current date/time
    }
   
    },{timestamps:true})

    const OrderHistoryModel = mongoose.model("orderhistory",orderHistorySchema )

    module.exports = {OrderHistoryModel}