const orderModel = require("../models/OrderModel")

const addorder = async (req,res)=>{
    try{
        const order = await orderModel.create(req.body)
        res.status(200).json({
        message:"Order added successfully",
        data:order
    })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
    
}

const getAllOrder = async(req,res)=>{
    try{
        const getorders = await orderModel.find().populate('cartId')
        res.status(200).json({
            message:"Order fetched successfully",
            data:getorders
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}


module.exports={
    addorder,getAllOrder
}