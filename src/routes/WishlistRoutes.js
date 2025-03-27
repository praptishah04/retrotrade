const routes = require("express").Router()
const wishlistControllers = require("../controllers/WishlistControllers")

routes.post("/add", wishlistControllers.addToWishlist);

// Route to get all wishlist items for a specific buyer
routes.get("/:buyerId", wishlistControllers.getWishlistByBuyer);

// Route to remove a product from the wishlist
routes.delete("/remove", wishlistControllers.removeFromWishlist);

module.exports=routes