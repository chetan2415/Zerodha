const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    accountHolder: { type: String, required: function () { return this.isVerified; } }, // Required only after verification
    mobile: { type: Number, required: true, unique: true },
    accountNumber: { type: Number, required: function () { return this.isVerified; } }, 
    ifscCode: { type: String, required: function () { return this.isVerified; } }, 
    bankName: { type: String, required: function () { return this.isVerified; } }, 
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
