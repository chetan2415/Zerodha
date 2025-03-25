const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  //console.log("connected!")
  try {
    const { username,
            password,
            email,  
            mobile } = req.body;

    const existingUser = await User.find({email});
    const hashedPassword = await bcrypt.hash(password, 12);
    if(existingUser == email){
      prompt("user alreay exist");
    }

    const user = await User.create({ 
      username,  
      password: hashedPassword, 
      email,
      mobile });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(201).json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.error("Signup error: ", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
