const buyerModel = require("../models/BuyerModel")

const addbuyer = async(req,res)=>{
    try{
        const buyers = await buyerModel.create(req.body)
        res.staus(200).json({
            message:"Buyer added successfully",
            data:buyers
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
}

module.exports={
    addbuyer
}