const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    buyerId:{
        type:Schema.Types.ObjectId,
        ref:"Buyer"
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        // default:"1"
    },
    productprice:{
        type:String,
        // default:true
        required:true
    }
})

module.exports= mongoose.model("cart",cartSchema)