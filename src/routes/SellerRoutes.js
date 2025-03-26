const routes = require("express").Router()
const sellerController = require("../controllers/SellerControllers")

routes.post("/addseller",sellerController.addseller)
routes.post("/loginseller", sellerController.loginSeller);

module.exports=routes