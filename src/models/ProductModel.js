const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        // required:true,
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    imageURL:{
        type:String
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    // status:{
    //     // enum : ['Available', 'Sold'],
    //     type:String,
    //     //required:true
    //     // default:"Available"
    // },
    subcategoryId:{
        type:Schema.Types.ObjectId,
        ref:"Subcategory"
    },
    sellerId:{
        type:Schema.Types.ObjectId,
        ref:"Seller"  
    },
    // condition:{
    //     enum: ['New', 'good' , 'used'],
    //     type:String
    // },
    // listing_date: {  // New field added
    //     type: Date,
    //     // default: Date.now // Automatically sets the timestamp when a product is added
    // }
},{
    timestamps:true
})

module.exports = mongoose.model("Product",productSchema)