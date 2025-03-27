const mongoose = require("mongoose")
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
    buyerId:{
        type:Schema.Types.ObjectId,
        ref:"Buyer"
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    added_date: {
        type: Date,
        default: Date.now
    }
})

module.exports= mongoose.model("wishlist",wishlistSchema)