const mongose = require("mongoose");

const contactSchema = new mongose.Schema({
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
});

const contactModel = mongose.model("contactModel",contactSchema)

module.exports = contactModel
