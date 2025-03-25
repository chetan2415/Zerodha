const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createSecretToken = (userId) => {
    return jwt.sign({ userId }, process.env.TOKEN_KEY, {
        expiresIn: "7d", // Token valid for 7 days
    });
};
