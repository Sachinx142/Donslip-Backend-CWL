const authModel = require("../model/authModel");
const { generateToken } = require("../utils/jwt");
// const {generateOtp } = require("../utils/otp")

const loginAuth = async (req, res) => {
  try {
    const { contact, type } = req.body;

    if (!contact || !type) {
      return res.status(400).json({ message: "Email and Phone are required", status: 0 });
    }

    const contactType = type === 1 ? 'email' : type === 2 ? 'phone' : null;

    if (!contactType) {
      return res.status(400).json({ message: "Invalid type value", status: 0 });
    }

    const auth = await authModel.findOne({ [contactType]: contact });

    if (!auth) {
      return res.status(404).json({ message: "User not found", status: 0 });
    }

    const otp = 1234
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    auth.otp = otp;
    auth.otpExpiry = otpExpiry;
    auth.lastLoginMethod = contactType;
    await auth.save();

    console.log(`Send OTP ${otp} to ${contactType}: ${contact}`);

    return res.status(200).json({
      message: "OTP sent successfully",
      user: {
        id: auth._id,
        name: auth.name,
        email: auth.email,
        phone: auth.phone,
      },
      status:1
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message, status: 0 });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { contact, otp } = req.body;

    if (!contact || !otp) {
      return res.status(400).json({ message: "Contact and OTP are required", status: 0 });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isPhone = /^\d{10}$/.test(contact);
    const contactType = isEmail ? 'email' : isPhone ? 'phone' : null;

    if (!contactType) {
      return res.status(400).json({ message: "Invalid contact format", status: 0 });
    }

    const user = await authModel.findOne({ [contactType]: contact });

    if (!user) {
      return res.status(404).json({ message: "User not found", status: 0 });
    }

    if (user.lastLoginMethod !== contactType) {
      return res.status(400).json({
        message: `OTP must be verified using the same method as login (${user.lastLoginMethod})`,
        status: 0,
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP", status: 0 });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired", status: 0 });
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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      status:1
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message, status: 0 });
  }
};

const registerAuth = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required", status: 0 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format", status: 0 });
    }
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format", status: 0 });
    }

    
    const isExists = await authModel.findOne({ $or: [{ email }, { phone }] });

    if (isExists) {
      return res.status(400).json({ message: "User already registered", status: 0 });
    }

    const newUser = await authModel.create({ name, email, phone });

    return res.status(201).json({
      message: "Register successfully",
      status: 1,
      data: newUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message, status: 0 });
  }
};




module.exports = {
  loginAuth,
  registerAuth,
  verifyOtp,
};
