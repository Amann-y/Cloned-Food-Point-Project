const { CartItemsModel } = require("../models/cartModel");

const addItemToCartController = async (req, res) => {
  try {
    const { userId, productId, imgURL, name, description, qty, price } = req.body;

    let cart = await CartItemsModel.findOne({ userId });

    if (!cart) {
      cart = new CartItemsModel({ userId, cartItem: [] });
    }

    // Get current date
    const currentDate = new Date();

    // Check if cart was updated today (compare with current date)
    const cartUpdatedAt = cart.updatedAt || currentDate; // Use updatedAt or current date

    const cartUpdatedDay = cartUpdatedAt.getDate();
    const cartUpdatedMonth = ("0" + (cartUpdatedAt.getMonth() + 1)).slice(-2); // Add leading zero if single digit
    const cartUpdatedYear = cartUpdatedAt.getFullYear();

    const currentDay = currentDate.getDate();
    const currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Add leading zero if single digit
    const currentYear = currentDate.getFullYear();

    // Find if the product already exists in cart for today
    const itemIndex = cart.cartItem.findIndex(
      (item) => item.productId.toString() === productId &&
                item.createdAt.getDate() === currentDay &&
                item.createdAt.getMonth() === currentDate.getMonth() &&
                item.createdAt.getFullYear() === currentDate.getFullYear()
    );

    if (itemIndex > -1) {
      // Product exists in cart for today, update quantity and price
      cart.cartItem[itemIndex].qty += qty;
      cart.cartItem[itemIndex].price += price * qty;
    } else {
      // Product does not exist in cart for today, add it
      cart.cartItem.push({
        productId,
        imgURL,
        name,
        description,
        qty,
        price,
        createdAt: currentDate, // Set createdAt to current date
      });
    }

    await cart.save(); // Save the updated cart

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const userSpecificCartDataController = async (req, res) => {
  try {
    const { userId } = req.body;
    const response = await CartItemsModel.findOne({ userId });
    if (response) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "No Data Available" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { addItemToCartController, userSpecificCartDataController };
