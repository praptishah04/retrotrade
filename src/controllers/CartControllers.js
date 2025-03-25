const cartModel = require("../models/CartModel");

const addcart = async (req, res) => {
    try {
        const { buyerId, productId, quantity } = req.body;

        if (!buyerId || !productId) {
            return res.status(400).json({ message: "Buyer ID and Product ID are required" });
        }

        // Check if cart already exists for the user
        let cart = await cartModel.findOne({ buyerId });

        if (cart) {
            // If product already exists in the cart, update quantity
            const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (productIndex > -1) {
                cart.items[productIndex].quantity += quantity || 1; // Increment quantity
            } else {
                cart.items.push({ productId, quantity: quantity || 1 });
            }
        } else {
            // Create a new cart if it doesn't exist
            cart = await cartModel.create({
                buyerId,
                items: [{ productId, quantity: quantity || 1 }],
            });
        }

        await cart.save();

        res.status(200).json({
            message: "Product added successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCartByUserId = async (req, res) => {
    const { buyerId } = req.params;

    if (!buyerId) {
        return res.status(400).json({ message: "Buyer ID is required" });
    }

    try {
        // Fetch cart and populate product details
        const cart = await cartModel.findOne({ buyerId }).populate("items.productId");
        console.log("Buyer ID received:", buyerId);

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "No cart found for this user" });
        }

        res.status(200).json({
            message: "Cart products found successfully",
            data: cart,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addcart,
    getCartByUserId,
};
