const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No Token Provided" });
        }

        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid Token" });
            }
            req.user = decoded.userId; // Store userId in request
            next();
        });
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
