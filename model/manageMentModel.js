const mongoose = require("mongoose");

const managementSchema = new mongoose.Schema({
  fullname: {
    type: String,
    default:null,
  },
  email: {
    type: String,
    default:null,
  },
  phone: {
    type: String,
    default:null,
  },
  designation: {
    type: String,
      default:null,
  },
//   Type for 1 head and o for member
  type: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const managementModel = mongoose.model("managementModel", managementSchema);

module.exports = managementModel;
