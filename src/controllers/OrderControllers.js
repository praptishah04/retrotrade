const orderModel = require("../models/OrderModel")

const addorder = async (req, res) => {
    try {
        console.log("Incoming order data:", req.body); // Debugging

        const { cartId, buyerId, productId, totalorder } = req.body;

        if (!cartId || !buyerId || !productId || !totalorder) {
            return res.status(400).json({ message: "Missing required fields", receivedData: req.body });
        }

        const order = await orderModel.create(req.body);
        res.status(200).json({ message: "Order added successfully", data: order });

    } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const getAllOrder = async(req,res)=>{
    try{
        const getorders = await orderModel.find().populate('cartId productId buyerId')
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