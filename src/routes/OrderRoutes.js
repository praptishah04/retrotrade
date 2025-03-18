const routes = require("express").Router()
const orderControllers = require("../controllers/OrderControllers")


routes.post("/addorder",orderControllers.addorder)

module.exports=routes