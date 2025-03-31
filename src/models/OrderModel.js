const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    cartId:{
        type:Schema.Types.ObjectId,
        ref:"cart"
    },
    buyerId:{
        type:Schema.Types.ObjectId,
        ref:"Buyer"
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    orderstatus:{
        type: String, 
        enum:['Pending' , 'Processing' , 'Shipped' , 'Delivered' , 'Cancelled' , 'Refunded'],
        default:"Pending"
    },
    totalorder:{
        type: Number,
        required:true,
    },
    orderdate: {  
        type: Date,
        default: Date.now  // Automatically sets the timestamp when a new document is created
    },
    
})

module.exports= mongoose.model("order",orderSchema)