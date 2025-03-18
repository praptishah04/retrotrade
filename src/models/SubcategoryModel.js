const mongoose = require("mongoose")
const Schema = mongoose.Schema

const subCategory = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }
})

module.exports=mongoose.model("Subcategory",subCategory)