const orderModel = require("../models/OrderModel")

const addorder = async (req, res) => {
    try {
        console.log("Incoming order data:", req.body); // Debugging

        const { cartId, buyerId, productId, totalorder } = req.body;
        console.log(req.body)
        // if ( !buyerId || !productId || !totalorder) {
        //     return res.status(400).json({ message: "Missing required fields", receivedData: req.body });
        // }

        const order = await orderModel.insertMany(req.body);
        console.log("order....",order)
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
  //  const cartId = req.params.cartId;

  try {
    const foundOrder = await orderModel.find({buyerId:buyerId})
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

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteOrdersByBuyerId = async (req, res) => {
  const { buyerId } = req.params;

  try {
    // Delete all orders for the buyer
    const deletedOrders = await orderModel.deleteMany({ buyerId: buyerId });

    if (deletedOrders.deletedCount === 0) {
      return res.status(404).json({ message: "No orders found for this buyer." });
    }

    res.status(200).json({
      message: "All orders deleted successfully",
      data: deletedOrders,
    });
  } catch (error) {
    console.error("Error deleting orders:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



module.exports={
    addorder,getAllOrder,getOrderByBuyerId,deleteOrder,deleteOrdersByBuyerId
}