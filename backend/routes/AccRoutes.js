const express = require("express");
const { createAccount, generateOtp, verifyOtp, resetOtp, checkAccount, removeAccount } = require("../controllers/AccController");

const router = express.Router();

router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-otp", resetOtp);
router.post("/newAccount", createAccount);

router.get("/checkAccount", checkAccount);
router.delete("/removeAccount", removeAccount);

module.exports = router;
