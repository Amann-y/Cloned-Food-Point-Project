const express = require('express')
const { getAllFoodItems,createFoodItems,deleteFoodItem,updateFoodItem,getSingleFoodItem} = require('../controllers/foodItemsController')
const {checkUserAuth} = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/create-food", checkUserAuth ,createFoodItems)
router.get("/get-all-food-items", getAllFoodItems)

router.put("/update-item/:id",checkUserAuth,updateFoodItem  )
router.delete("/delete-item/:id",checkUserAuth,deleteFoodItem )
router.get("/food-item/:id",getSingleFoodItem)

module.exports = router