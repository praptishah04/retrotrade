const orderModel = require("../models/OrderModel")

const addorder = async (req, res) => {
    try {
        console.log("Incoming order data:", req.body); // Debugging

        const { cartId, buyerId, productId, totalorder } = req.body;
        console.log(req.body)
        // if ( !buyerId || !productId || !totalorder) {
        //     return res.status(400).json({ message: "Missing required fields", receivedData: req.body });
        // }

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

const getOrderByBuyerId = async (req, res) => {
    const buyerId = req.params.buyerId;
    const cartId = req.params.cartId;

  try {
    const foundOrder = await orderModel.find({buyerId:buyerId,cartId:cartId})
      .populate("buyerId")
      .populate({path:"cartId",populate:{path:"productId"}});

    if (!foundOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order Fetched",
      data: foundOrder,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message, 
    });
  }
};


module.exports={
    addorder,getAllOrder,getOrderByBuyerId
}