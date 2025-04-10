const wishlistModel = require("../models/WishlistModel");

// Add item to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { buyerId, productId } = req.body;

        const existingItem = await wishlistModel.findOne({ buyerId, productId });
        if (existingItem) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        const newWishlistItem = new wishlistModel({ buyerId, productId });
        await newWishlistItem.save();

        res.status(201).json({ message: "Product added to wishlist", wishlistItem: newWishlistItem });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get wishlist for a specific buyer
const getWishlistByBuyer = async (req, res) => {
    try {
        const { buyerId } = req.params;
        const wishlist = await wishlistModel.find({ buyerId }).populate("productId");

        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { buyerId, productId } = req.body;
        const deletedItem = await wishlistModel.findOneAndDelete({ buyerId, productId });

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found in wishlist" });
        }

        res.status(200).json({ message: "Item removed from wishlist" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { addToWishlist, getWishlistByBuyer, removeFromWishlist };
 