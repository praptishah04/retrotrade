const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    cartId:{
        type:Schema.Types.ObjectId,
        ref:"cart"
    },
    orderstatus:{
        enum:['Pending' , 'Processing' , 'Shipped' , 'Delivered' , 'Cancelled' , 'Refunded'],
    },
    totalorder:{
        type:String,
    },
    orderdate: {  
        type: Date,
        default: Date.now  // Automatically sets the timestamp when a new document is created
    }
})

module.exports= mongoose.model("order",orderSchema)