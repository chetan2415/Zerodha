const express = require("express");
const Account = require("../models/AccountModel");

// Generate OTP for account verification
exports.generateOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required" });
    }

    let account = await Account.findOne({ mobile });

    if (!account) {
      account = new Account({ mobile, isVerified: false });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    account.otp = otp;
    account.otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 mins
    await account.save();

    //console.log(`Generated OTP for ${mobile}:`, otp);
    res.json({ message: "OTP generated successfully!", otp });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) {
      return res.status(400).json({ error: "Mobile number and OTP are required" });
    }

    let account = await Account.findOne({ mobile });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (!account.otp || account.otp !== otp || account.otpExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    account.otp = null;
    account.otpExpires = null;
    account.isVerified = true;
    await account.save({ validateBeforeSave: false });

    res.json({ message: "OTP verified successfully! Account is now verified." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reset OTP
exports.resetOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required" });
    }

    let account = await Account.findOne({ mobile });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    account.otp = otp;
    account.otpExpires = Date.now() + 5 * 60 * 1000;
    account.isVerified = false;
    await account.save();

    //console.log(`New OTP for ${mobile}:`, otp);
    res.json({ message: "OTP reset successfully!", otp });
  } catch (error) {
    console.error("Error resetting OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create account
exports.createAccount = async (req, res) => {
  try {
    const { accountHolder, mobile, accountNumber, ifscCode, bankName } = req.body;

    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required" });
    }

    let account = await Account.findOne({ mobile });

    if (!account || !account.isVerified) {
      return res.status(400).json({ error: "OTP verification required before adding an account" });
    }

    account.accountHolder = accountHolder;
    account.accountNumber = accountNumber;
    account.ifscCode = ifscCode;
    account.bankName = bankName;

    await account.save();
    res.status(201).json({ message: "Bank account added successfully!" });
  } catch (error) {
    console.error("Error saving account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Check account
exports.checkAccount = async (req, res) => {
  try {
    const { mobile } = req.query;

    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required" });
    }

    // Fetch the account
    const account = await Account.findOne({ mobile });

    if (!account) {
      return res.json({ hasAccount: false, message: "No account found" });
    }

    res.json({ hasAccount: true, account });
  } catch (error) {
    console.error("Error checking account status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove account
exports.removeAccount = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required" });
    }

    const deletedAccount = await Account.findOneAndDelete({ mobile });

    if (!deletedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json({ success: true, message: "Account removed successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
