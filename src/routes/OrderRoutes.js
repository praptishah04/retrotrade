const routes = require("express").Router()
const orderControllers = require("../controllers/OrderControllers")


routes.post("/addorder",orderControllers.addorder)
routes.get("/getallorder",orderControllers.getAllOrder)
routes.get("/buyer/:buyerId/:cartId", orderControllers.getOrderByBuyerId);

module.exports=routes