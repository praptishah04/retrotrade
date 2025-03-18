const sellerModel = require("../models/SellerModel")

const addSeller = async(req,res)=>{
    try{
        const seller = await sellerModel.create(req.body)
        res.status(200).json({
            mesage:"Seller Added successfully",
            data:seller
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }

}

module.exports={
    addSeller
}