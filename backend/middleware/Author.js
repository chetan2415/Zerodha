const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ status: false, message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: false, message: "Invalid token." });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found." });
      }

      req.user = user; 
      next();
    });
  } catch (error) {
    console.error("User verification error:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};
