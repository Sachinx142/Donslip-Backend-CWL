const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    subCategoryName:{
        type:String,
        default:null
    },
    status:{
        type:Number,
        default:1
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categoryModel",
        default:null
    }
})

const subCategoryModel = mongoose.model("subCategoryModel",subCategorySchema)

module.exports = subCategoryModel