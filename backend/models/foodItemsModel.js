const mongoose = require("mongoose");

const foodItemsSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    imgURL: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    options: {
        type: String,
        enum: ["available", "unavailable"],
        default: "available"
    },
    qty: {
        type: Number, // Assuming qty is a number
        default: 1 // You can set a default value if needed
    }
}, { timestamps: true });

const FoodItemsModel = mongoose.model('fooditems', foodItemsSchema);

module.exports = { FoodItemsModel };
