const organizationModel = require("../model/organizationModel");
const { generateToken } = require("../utils/jwt");
// const {generateOtp } = require("../utils/otp")

const Orglogin = async (req, res) => {
  try {
    const { contact, type } = req.body;

    if (!contact || !type) {
      return res.json({ message: "Email and Phone are required", status: 0 });
    }

    const contactType = type === 1 ? "email" : type === 2 ? "phone" : null;

    if (!contactType) {
      return res.json({ message: "Invalid type value", status: 0 });
    }

    const user = await organizationModel.findOne({ [contactType]: contact });

    if (!user) {
      return res.json({ message: "User not found", status: 0 });
    }

    const otp = 1234;
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    user.lastLoginMethod = contactType;
    await user.save();

    console.log(`Send OTP ${otp} to ${contactType}: ${contact}`);

    return res.status(200).json({
      message: "OTP sent successfully",
      status: 1,
      data:{
        id:user._id
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message, status: 0 });
  }
};

const OrgverifyOtp = async (req, res) => {
  try {
    const { contact, otp } = req.body;

    if (!contact || !otp) {
      return res.json({ message: "Contact and OTP are required", status: 0 });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isPhone = /^\d{10}$/.test(contact);
    const contactType = isEmail ? "email" : isPhone ? "phone" : null;

    if (!contactType) {
      return res.json({ message: "Invalid contact format", status: 0 });
    }

    const user = await organizationModel.findOne({ [contactType]: contact });

    if (!user) {
      return res.json({ message: "User not found", status: 0 });
    }

    if (user.lastLoginMethod !== contactType) {
      return res.json({
        message: `OTP must be verified using the same method as login (${user.lastLoginMethod})`,
        status: 0,
      });
    }

    if (user.otp !== otp) {
      return res.json({ message: "Invalid OTP", status: 0 });
    }

    if (user.otpExpiry < new Date()) {
      return res.json({ message: "OTP expired", status: 0 });
    }

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    user.lastLoginMethod = contactType;
    await user.save();

    const token = generateToken({ id: user._id });

    return res.status(200).json({
      message: "OTP verified, login successful",
      token,
      data: {
        id:user._id,
        role: user.role,
        formCounter: user.formCounter,
      },
      status: 1,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message, status: 0 });
  }
};

const OrgRegister = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.json({ message: "All fields are required", status: 0 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.json({ message: "Invalid email format", status: 0 });
    }
    if (!/^\d{10}$/.test(phone)) {
      return res.json({ message: "Invalid phone number format", status: 0 });
    }

    const isExists = await organizationModel.findOne({
      $or: [{ email }, { phone }],
    });

   
if (isExists) {
  if (isExists.email === email) {
    return res.json({ message: "Email already registered", status: 0 });
  }
  if (isExists.phone === phone) {
    return res.json({ message: "Phone number already registered", status: 0 });
  }
  return res.json({ message: "User already registered", status: 0 });
}

    const otp = 1234;
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const user = await organizationModel.create({
      name,
      email,
      phone,
      otp,
      otpExpiry,
    });
    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    return res.status(201).json({
      message: "Register successfully",
      status: 1,
      data: {
        id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message, status: 0 });
  }
};

const OrgRegisterVerifyOtp = async (req, res) => {
  try {
    const { id, otp } = req.body;

    if (!id || !otp) {
      return res.json({ status: 0, message: "Organization Not found" });
    }

    const user = await organizationModel.findById(id);

    if (!user) {
      return res.json({ message: "Organization not found", status: 0 });
    }

    if (new Date() > user.otpExpiry) {
      return res.json({ message: "OTP expired", status: 0 });
    }

    if (user.otp !== otp) {
      return res.json({ message: "Invalid OTP", status: 0 });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully",
      status: 1,
      data: {
        id:user._id,
        formCounter: user.formCounter,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message, status: 0 });
  }
};

module.exports = {
  Orglogin,
  OrgverifyOtp,
  OrgRegister,
  OrgRegisterVerifyOtp,
};
