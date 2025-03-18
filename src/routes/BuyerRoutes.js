const routes = require("express").Router()
const buyerController = require("../controllers/BuyerControllers")

routes.post("/addbuyer",buyerController.addbuyer)

module.exports=routes