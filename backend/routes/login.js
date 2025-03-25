const { Login } = require("../controllers/login"); 
const router = require("express").Router();
const {userVerification} = require("../middleWare/Author");

router.post("/login", Login);

router.get('/', userVerification, (req, res) => {
    res.status(200).json({ message: "This is your profile", user: req.user });
});

module.exports = router;
