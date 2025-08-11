const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
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
    registerImage: { type: String, default: null },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryModel",
      default: null,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategoryModel",
      default: null,
    },
    religionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "religionSubCategoryModel",
      default: null,
    },
    registeredUnderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UndregisteredUnderModelerRegister",
      default: null,
    },
    registeredName: { type: String, default: "" },
    alias: { type: String, default: "" },

    //   Registered Address
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    district: { type: String, default: "" },
    pincode: { type: String, default: "" },
    fullAddress: { type: String, default: "" },

    panNo: { type: String, default: "" },

    //Upload Licence & Approvals
    licenceApprovalId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "uploadedLicenseModel",
      default: null,
    },
    // 1 for Register and 0 for Unregister
    organiZationType:{
     type:Number,
     default:0
    },
    // Count Form Steps
    formCounter:{
      type:Number,
      default:0
    },
    // Type 1 for admin and type 2 for admin,agent
    role:{
       type:Number,
       default:0
    },
    status: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const registerModel = mongoose.model("registerModel", registerSchema);

module.exports = registerModel;
