const mongoose = require("mongoose");

const licenceApprovals = new mongoose.Schema({
    lincenceName:{
        type:String,
        default:null
    },
    status:{
        type:Number,
        default:0
    }
})

const licenseApprovalsModel = mongoose.model("licenceApprovalsModel",licenceApprovals)

module.exports = licenseApprovalsModel

