const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    lastLoginMethod: {
      type: String,
      enum: ["email", "phone"],
      default: null,
    },
    otp: { type: Number, default: null },
    otpExpiry: { type: Date, default: null },
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
    religionSubCategoryId: {
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

    //Upload Licence & Approvals
    licenceApprovalId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "uploadedLicenseModel",
      default: null,
    },

    // Management
    managements: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "managementModel",
      default: [],
    },

    // Bank Details
    accountHolderName: {
      type: String,
      default: null,
    },
    accountNumber: {
      type: String,
      default: null,
    },
    ifsc: {
      type: String,
      default: null,
      uppercase: true,
    },
    bankName: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    //accountype means 0 for Normal A/c and 1 for FCRA A/c
    accountType: {
      type: Number,
      default: 0,
    },

    //accountTypeLabel means 0 for Normal A/c and 1 for FCRA A/c on the other hand Which Bank Type
    accountTypeLabel: {
      type: String,
      default: 0,
    },
    // Contact Details
      registeredAddress: {
    type: String,
    default: null,
  },
  googleLocation: {
    type: String,
    default: null,
  },
  phoneNo1:{
        type: String,
    default: null,
  },
  phoneNo2:{
        type: String,
    default: null,
  },
  emailAddress1:{
        type: String,
    default: null,
  },
  emailAddress2:{
        type: String,
    default: null,
  },
  websiteURL:{
    type:String,
    default:null
  },

    // About
   vision: {
    type: String,
    default: null,
  },
  coreActivities: {
    type: String,
    default: null,
  },
  otherActivities:{
    type:String,
    default:null
  },

    //OTP Verification
    otpVefication: {
      type: Number,
      default: 0,
    },

    // 1 for Register and 0 for Unregister
    organiZationType: {
      type: Number,
      default: 0,
    },
    // Count Form Steps
    formCounter: {
      type: Number,
      default: 1,
    },
    role: {
      type: String,
      default: "Organization",
    },
    status: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const organizationModel = mongoose.model(
  "organizationModel",
  organizationSchema
);

module.exports = organizationModel;
