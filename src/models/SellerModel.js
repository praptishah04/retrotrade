const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sellerSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
    contactnumber:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Seller",sellerSchema)