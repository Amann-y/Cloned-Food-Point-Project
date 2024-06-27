const { AddressModel } = require("../models/addressModel");

const saveUserAddress = async (req, res) => {
  const { fullName, phone, pinCode, city, state, address } = req.body;
  const {_id}= req.user;
  try {
    if (!fullName || !phone || !pinCode || !city || !state || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Required" });
    }

    const existingUserAddress = await AddressModel.findOne({userId:_id});

    if (existingUserAddress) {
      const response = await AddressModel.findByIdAndUpdate(
        existingUserAddress._id,
        { userId: req.user, fullName, phone, pinCode, city, state, address },
        { new: true }
      );
    
      if (response) {
        return res.status(200).json({
          success: true,
          message: "Address Added Into The Database",
          response,
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: "IIInternal server error" });
      }
    } else {
      const response = await AddressModel.create({
        userId: req.user,
        fullName,
        phone,
        pinCode,
        city,
        state,
        address,
      });

      if (response) {
        return res.status(200).json({
          success: true,
          message: "Address Added Into The Database",
          response,
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: "IInternal server error" });
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const getAddress = async (req, res) => {
  try {
    const userId = req.user;
    const userAddressDetail = await AddressModel.findOne({ userId });
    if (userAddressDetail) {
      res.status(200).json({ success: true, userAddressDetail });
    } else {
      res.status(400).json({ success: false, message: "No Address Found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { saveUserAddress, getAddress };
