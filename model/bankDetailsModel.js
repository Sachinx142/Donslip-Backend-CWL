const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
  accountHolderName: {
    type: String,
    default:null,
  },
  accountNumber: {
    type: String,
    default:null,
  },
  ifsc: {
    type: String,
    default:null,
    uppercase: true
  },
  bankName: {
    type: String,
     default:null
  },
  address: {
    type: String,
    default:null
  },
//accountype means 0 for Normal A/c and 1 for FCRA A/c
  accountType: {
    type: Number,
    default:0,
  },

//accountTypeLabel means 0 for Normal A/c and 1 for FCRA A/c on the other hand Which Bank Type
  accountTypeLabel: {
    type: String,
     default:0,
  }
}, {
  timestamps: true
});

const accountModel = mongoose.model("accountModel",accountSchema)

module.exports = accountModel
