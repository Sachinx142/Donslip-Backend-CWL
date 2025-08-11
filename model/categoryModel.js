const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        default:0
    },
    status:{
        type:Number,
        default:0
    }
})

const categoryModel = mongoose.model("categoryModel",categorySchema)

module.exports = categoryModel

