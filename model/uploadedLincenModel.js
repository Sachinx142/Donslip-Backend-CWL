const mongoose = require("mongoose");

const uploadedLicenseSchema = new mongoose.Schema({
    uploadRegistrationFile: {
        type: String,
        default: null
    }
}, { timestamps: true });

const uploadedLicenseModel = mongoose.model("uploadedLicenseModel", uploadedLicenseSchema);

module.exports = uploadedLicenseModel;
