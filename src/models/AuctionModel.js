const mongoose = require("mongoose")
const Schema = mongoose.Schema

const auctionSchema = new Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    startingPrice: { 
        type: Number, required: true 
    },
    endTime: { 
        type: Date, required: true 
    },
    createdAt: { 
        type: Date, default: Date.now 
    },
    bids: [
        {
          buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' },
          bidAmount: Number,
          bidTime: Date,
        }
      ]
})
module.exports = mongoose.model('Auction', auctionSchema);
