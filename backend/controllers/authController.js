const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Generate random OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Verify email and send OTP for signup
exports.signupWithOtp = async (req, res) => {
  try {
    const { email, mobile, username, password } = req.body;

    if (!email || !mobile || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, mobile, username, password, otp: "", otpExpires: null });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; 
    await user.save();

    //console.log(`OTP for ${email}:`, otp);
    res.status(200).json({ message: "OTP sent successfully!", otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// OTP re-generation
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found. Please sign up again." });
    }

    const newOtp = generateOtp();
    user.otp = newOtp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; 
    user.isOtpVerified = false;
    await user.save();

    //console.log("Resent OTP:", newOtp);
    res.json({ success: true, message: "New OTP sent successfully",newOtp });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// OTP verification for signup
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.otp || user.otp !== otp.toString() || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Signup after OTP verification
exports.signup = async (req, res) => {
  try {
    const { email, username, password, mobile } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "OTP not verified. Please verify first." });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "OTP not verified. Please verify first." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.username = username;
    user.mobile = mobile;
    user.email = email;

    await user.save();
    res.status(200).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login with email and password
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ================= Forgot Password ================= //

// Send OTP for password reset
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; 
    await user.save();

    //console.log(`OTP sent to ${email}:`, otp);
    res.json({ message: "OTP sent successfully",otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify OTP for password reset
exports.verifyForgotOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
