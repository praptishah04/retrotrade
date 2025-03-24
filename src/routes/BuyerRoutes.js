const routes = require("express").Router()
const buyerController = require("../controllers/BuyerControllers")

routes.post("/addbuyer",buyerController.addbuyer)
// routes.get("/login",buyerController.getbuyers)
routes.post("/login", buyerController.loginBuyer);

module.exports=routes