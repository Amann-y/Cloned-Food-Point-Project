const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
// const { transporter } = require("../config/emailConfig");

const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    newUser.save();

    const token = await jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
      userName: newUser.name,
      userEmail: newUser.email,
      token,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    } else {
      // password checking
      const user = await bcrypt.compare(password, existingUser.password);

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Credentials" });
      } else {
        const token = await jwt.sign(
          { userId: existingUser._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          success: true,
          message: "User login successfully",
          userId: existingUser._id,
          userName: existingUser.name,
          userEmail: existingUser.email,
          token,
        });
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const changePasswordController = async (req, res) => {
  const {password, confirmPassword} = req.body
 try {
  if(password && confirmPassword){
    if(password !== confirmPassword){
     return res.status(400).json({success:false, message:"Password & Confirm Password Don't Match"})
    }else{
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
     const response = await UserModel.findByIdAndUpdate(req.user._id, {$set:{password: hashPassword}})
     if(response){
     return res.status(200).json({success:true, message:"Password Changed Successfully"})
     }
    }
 }else{
   return res.status(400).json({success:false, message:"All Fields Are Required"})
 }
 } catch (error) {
  // console.log(error);
  res.status(400).json({ success: false, message: "Internal server error" });
 }
};

const loggedUserController = async (req, res) => {
  try {
    res.status(200).json({ user: req.user, success: true });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

// const sendUserPasswordForgotEmail = async (req,res)=>{
//   try {
//     const {email} = req.body
//     if(!email){
//       return res.status(400).json({ success: false, message: "Email Is Required" });
//     }else{
//       const user = await UserModel.findOne({email})
//       if(!user){
//          return res.status(400).json({ success: false, message: "Email Doesn't Exist" });
//       }else{
//         const secret = user._id + process.env.JWT_SECRET_KEY
//         const token = await jwt.sign({userId:user._id}, secret,{expiresIn:"15m"})
//         const link = `http://127.0.0.1:5173/api/user/reset/${user._id}/${token}`

//         // send email
//         let info = await transporter.sendMail({
//           from :  process.env.EMAIL_FROM,
//           to : user.email,
//           subject : "Food Point - Password Reset Link",
//           html : `<a href=${link}>Click Here</a> To Reset Your Password`
//         })

//         res.status(200).json({success:true, message:"Password Reset Email Sent, Please Check Your Email"})
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ success: false, message: "Internal server error" });
//   }
// }

// const userPasswordReset = async (req,res)=>{
//   const {password, confirmPassword} = req.body
//   const {id,token} = req.params
//   const user = await UserModel.findOne({_id:id})
//   const newSecret = await user._id + process.env.JWT_SECRET_KEY
//  try {
//   jwt.verify(token, newSecret)
//   if(password && confirmPassword){
//     if(password == confirmPassword){
//       const salt = await bcrypt.genSalt(10)
//       const newHashedPassword = await bcrypt.hash(password, salt)
//       const response= await UserModel.findByIdAndUpdate(user._id,{$set:{password:newHashedPassword}})
//       if(response){
//         res.status(200).json({ success: true, message: "Password Reset Successfully" });
//       }
//     }else{
//       return   res.status(400).json({ success: false, message: "Password & confirm Password Don't Match" });
//     }
//   }else{
//     return   res.status(400).json({ success: false, message: "All Fields Are Required" });
//   }
//  } catch (error) {
//   console.log(error);
//   res.status(400).json({ success: false, message: "Internal server error" });
//  }
// }

module.exports = {
  createUserController,
  loginUserController,
  changePasswordController,
  loggedUserController,
  // sendUserPasswordForgotEmail,
  // userPasswordReset
};
