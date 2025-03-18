const mongoose = require("mongoose")
const Schema = mongoose.Schema

const buyerSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        default:true
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

module.exports=mongoose.model("Buyer",buyerSchema)