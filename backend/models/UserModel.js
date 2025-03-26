const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String }, // Now optional
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Now optional
    mobile: { type: Number, required: true },
    otp: { type: String }, 
    otpExpires: { type: Date },
}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
