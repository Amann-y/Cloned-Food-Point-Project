const express = require("express");
const { saveUserAddress,getAddress  } = require("../controllers/addressController");
const { checkUserAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/address", checkUserAuth, saveUserAddress)
router.get("/user-address",checkUserAuth, getAddress )

module.exports = router