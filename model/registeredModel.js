const mongoose = require("mongoose");

const registeredSchema = new mongoose.Schema({
    registeredUnderName:{
        type:String,
        default:0
    },
    status:{
        type:Number,
        default:0
    }
})

const registeredModel = mongoose.model("registeredUnderModel",registeredSchema)

module.exports = registeredModel

