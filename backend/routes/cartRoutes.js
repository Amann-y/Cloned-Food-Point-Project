const express = require("express");
const {
  addItemToCartController,
  userSpecificCartDataController
} = require("../controllers/cartItemsController");
const { checkUserAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-to-cart", addItemToCartController);

router.get("/user-cart-data",checkUserAuth, userSpecificCartDataController)

module.exports = router;
