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

const getCartByUserId = async (req, res) => {
    const { buyerId } = req.params;

    if (!buyerId) {
        return res.status(400).json({ message: "Buyer ID is required" });
    }

    try {
        const carts = await cartModel.findOne({ buyerId });
        console.log("Buyer ID received:", buyerId);


        if (!carts) {
            return res.status(404).json({ message: "No cart found for this user" });
        }

        res.status(200).json({
            message: "Cart products found successfully",
            data: carts,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports={
    addcart,getCartByUserId
}