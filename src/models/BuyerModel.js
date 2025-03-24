const mongoose = require("mongoose")
const Schema = mongoose.Schema

const buyerSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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