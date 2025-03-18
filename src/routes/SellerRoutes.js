const routes = require("express").Router()
const sellerController = require("../controllers/SellerControllers")

routes.post("/addseller",sellerController.addSeller)

module.exports=routes