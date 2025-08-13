const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
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
  }
});

const aboutModel = mongoose.model("aboutModel",aboutSchema)

module.exports = aboutModel
