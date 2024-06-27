const express = require("express");
const { checkUserAuth } = require("../middlewares/authMiddleware");
const { getUserOrders } = require("../controllers/userOrdersHistrory");

const router = express.Router();

router.get("/get-user-order-history", checkUserAuth, getUserOrders)

module.exports = router