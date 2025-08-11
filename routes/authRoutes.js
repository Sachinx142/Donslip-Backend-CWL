const express = require("express");
const router = express.Router();
const { loginAuth,verifyOtp,registerAuth} = require("../controller/authController")

router.post("/login",loginAuth)
router.post("/register",registerAuth)
router.post("/verify-otp",verifyOtp)

module.exports = router