const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
    unique: true,
  },
  phone: {
    type: String,
    default: null,
    unique: true,
  },
  lastLoginMethod: {
    type: String,
    enum: ["email", "phone"],
    default: null,
  },
  otp: { type: Number },
  otpExpiry: { type: Date },
  status: {
    type: Number,
    default: null,
  },
});

const authModel = new mongoose.model("authModel", authSchema);

module.exports = authModel;
