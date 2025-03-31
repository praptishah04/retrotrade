const cartModel = require("../models/CartModel");

// const addCart = async (req, res) => {
//   try {
//     const savedCart = await cartModel.create(req.body);
//     res.status(201).json({
//       message: "Cart added successfully",
//       data: savedCart,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// };
const addCart = async (req, res) => {
  try {
    const { buyerId, productId, quantity, productprice } = req.body;
    // console.log(productPrice)

    // Check if the product is already in the cart for this buyer
    const existingCartItem = await cartModel.findOne({
      buyerId: buyerId,
      productId: productId,
    });

    if (existingCartItem) {
      // Product already in cart, update quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      res.status(200).json({
        message: "Cart updated successfully",
        data: existingCartItem,
      });
    } else {
      // Product not in cart, create new cart item
      const newCartItem = await cartModel.create({
        buyerId: buyerId,
        productId: productId,
        quantity: quantity,
        productprice: productPrice,
      });
      res.status(201).json({
        message: "Cart added successfully",
        data: newCartItem,
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};
const getAllCart = async (req, res) => {
  try {
    const cart = await cartModel
      .find()
      .populate("buyerId")
      .populate("productId");
    res.status(200).json({
      message: "All cart fetched successfully",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteCart = async (req, res) => {
  try {
    const deletedCart = await cartModel.findByIdAndDelete(req.params.id);
    res.json({
      message: "Cart Deleted Successfully",
      data: deletedCart,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const deletedCartItem = await cartModel.findByIdAndDelete(cartItemId);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({
      message: "Cart item deleted successfully",
      data: deletedCartItem,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
const getCartById = async (req, res) => {
  try {
    const foundCart = await cartModel
      .find()
      .populate("buyerId")
      .populate("productId");

    res.json({
      message: "Cart Fatched",
      data: foundCart,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
const getCartByBuyerId = async (req, res) => {
  try {
    const foundCart = await cartModel
      .find({ buyerId: req.params.buyerId })
      .populate("buyerId")
      .populate("productId");

    if (!foundCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({
      message: "Cart Fetched",
      data: foundCart,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message, // Use err.message for better error details
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while update cart",
      err: err,
    });
  }
};

module.exports = {
  addCart,
  getAllCart,
  deleteCart,
  getCartById,
  getCartByBuyerId,
  updateCart,
  deleteCartItem,
};