const express = require("express");
const router = express.Router();
const {
  Orglogin,
  OrgverifyOtp,
  OrgRegister,
  OrgRegisterVerifyOtp
} = require("../controller/organizationAuthController");

router.post("/login", Orglogin);
router.post("/verify-otp", OrgverifyOtp);
router.post("/register", OrgRegister);
router.post("/orgRegisterVerifyOtp", OrgRegisterVerifyOtp);

module.exports = router;
