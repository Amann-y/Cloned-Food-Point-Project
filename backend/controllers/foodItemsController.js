const { FoodItemsModel } = require("../models/foodItemsModel");

const createFoodItems = async (req, res) => {
  try {
    const { categoryName, name, imgURL, description, price, options } =
      req.body;

    const data = await FoodItemsModel.create({
      categoryName,
      name,
      imgURL,
      description,
      price,
      options,
    });
    await data.save();
    res.status(200).json({ success: true, data });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const getAllFoodItems = async (req, res) => {
  try {
    const data = await FoodItemsModel.find({});
    res.status(200).json({ success: true, data });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await FoodItemsModel.findByIdAndDelete(id);
    if (item) {
      res
        .status(200)
        .json({ success: true, message: "Item Deleted Successfully" });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, name, imgURL, description, price, options } =
      req.body;

    const update = {
      categoryName,
      name,
      imgURL,
      description,
      price,
      options,
    };
    const item = await FoodItemsModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (item) {
      res
        .status(200)
        .json({ success: true, message: "Item Updated Successfully", item });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const getSingleFoodItem = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await FoodItemsModel.findOne({_id : id});
      if (item) {
        res
          .status(200)
          .json({ success: true, message: "Item Deleted Successfully", item});
      } else {
        res.status(404).json({ success: false, message: "Item not found" });
      }
    } catch (error) {
      // console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

module.exports = {
  getAllFoodItems,
  createFoodItems,
  deleteFoodItem,
  updateFoodItem,
  getSingleFoodItem
};
