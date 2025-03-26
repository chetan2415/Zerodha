const express = require("express");
const router = express.Router();
module.exports =  { 
    signupWithOtp, 
    resendOtp, 
    verifyOtp, 
    signup, 
    login, 
    forgotPassword, 
    verifyForgotOtp, 
    resetPassword 
} = require("../controllers/authController");
const middleWare = require("../middleware/Author");

router.post("/signup-otp", signupWithOtp);
router.post("/resend-otp", resendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signup", signup); 
router.post("/login", login);

// Forgot Password Routes
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-otp", verifyForgotOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
