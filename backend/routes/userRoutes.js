const express = require("express");
const {
  createUserController,
  loginUserController,
  changePasswordController,
  loggedUserController,
  // sendUserPasswordForgotEmail,
  // userPasswordReset
} = require("../controllers/userController");
const { checkUserAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

// public routes
router.post("/create-User", createUserController);
router.post("/login-User", loginUserController);
// router.post("/reset-password-email", sendUserPasswordForgotEmail);
// router.post("/reset-password/:id/:token",  userPasswordReset);

// private routes
//Protected Routes
router.post("/change-password", checkUserAuth, changePasswordController);
router.get("/logged-user", checkUserAuth, loggedUserController);


module.exports = router;
