const auctionModel = require("../models/AuctionModel");
const productModel = require("../models/ProductModel");

// Add new auction
const addAuction = async (req, res) => {
  try {
    const { productId, startingBid, endTime } = req.body;

    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newAuction = await auctionModel.create({
      productId,
      startingBid,
      endTime,
    });

    res.status(200).json({
      message: "Auction created successfully",
      data: newAuction,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get all auctions
const getAllAuctions = async (req, res) => {
  try {
    const auctions = await auctionModel.find().populate("productId");
    res.status(200).json({
      message: "Auctions fetched successfully",
      data: auctions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addAuction,
  getAllAuctions,
};
