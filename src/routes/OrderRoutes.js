const routes = require("express").Router()
const orderControllers = require("../controllers/OrderControllers")


routes.post("/addorder",orderControllers.addorder)
routes.get("/getallorder",orderControllers.getAllOrder)
routes.get("/buyer/:buyerId/", orderControllers.getOrderByBuyerId);
routes.delete("/deleteorder/:orderId", orderControllers.deleteOrder);
routes.delete("/deleteorders/:buyerId", orderControllers.deleteOrdersByBuyerId);


module.exports=routes