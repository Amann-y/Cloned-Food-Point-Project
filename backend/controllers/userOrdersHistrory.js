const { CartItemsModel } = require("../models/cartModel");

const getUserOrders = async (req, res) => {
  try {
    const {_id} = req.user;
    const data = await CartItemsModel.findOne({userId:_id})
   
    if(data?.cartItem){
        return res.status(200).json({ success: true, cartItem: data.cartItem,   createdAt: data.updatedAt });
    }else{
        res.status(400).json({ success: false, message: "No Order History Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {getUserOrders}