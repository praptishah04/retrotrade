const routes = require("express").Router()
const cartControllers = require("../controllers/CartControllers")


routes.post("/addcart",cartControllers.addcart)

module.exports=routes