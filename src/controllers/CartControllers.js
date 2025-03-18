const cartModel = require("../models/CartModel")

const addcart = async(req,res)=>{
    try{
        const cart = await cartModel.create(req.body)
        res.status(200).json({
            message:"Product added successfully",
            data:cart
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports={
    addcart
}