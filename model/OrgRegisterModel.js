const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
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
    registrationNo: { type: String, default: "" },  

    //Upload Licence & Approvals
    licenceApprovalId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "uploadedLicenseModel",
      default: null,
    },
    status: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const registerModel = mongoose.model("registerModel",registerSchema)

module.exports = registerModel
