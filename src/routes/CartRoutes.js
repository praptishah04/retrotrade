const routes = require("express").Router()
const cartControllers = require("../controllers/CartControllers")


routes.post("/addcart",cartControllers.addcart)
routes.get("/user/:buyerId",cartControllers.getCartByUserId)

module.exports=routes