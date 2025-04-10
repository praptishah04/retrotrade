const routes = require("express").Router()
const cartControllers = require("../controllers/CartControllers")


routes.post("/addcart",cartControllers.addCart)
routes.get("/getallcart",cartControllers.getAllCart)
routes.delete("/deletecart/:id",cartControllers.deleteCart)
routes.get("/getcartbyid",cartControllers.getCartById)
routes.delete("/deletecartitem/:id", cartControllers.deleteCartItem);  // Add :id parameter
routes.get("/buyer/:buyerId", cartControllers.getCartByBuyerId);  // More RESTful path
routes.put("/updatecart/:id", cartControllers.updateCart);
routes.get("/cart/:cartId", cartControllers.getCartByCartId);


module.exports=routes