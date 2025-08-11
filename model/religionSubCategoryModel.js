const mongoose = require("mongoose");

const religionSubCategorySchema = new mongoose.Schema({
    religionName:{
        type:String,
        default:null
    },
     categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categoryModel",
        default:null
    },
    subcategoryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"subCategoryModel",
            default:null
    },
    status:{
        type:Number,
        default:null
    },
})  

const religionSubCategoryModel = mongoose.model("religionSubCategoryModel",religionSubCategorySchema)

module.exports = religionSubCategoryModel